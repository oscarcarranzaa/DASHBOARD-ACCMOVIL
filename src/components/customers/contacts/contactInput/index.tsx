'use client'

import { getAllsContacts } from '@/api/contact'
import Spinner from '@/components/icons/spinner'
import { Input, Popover, PopoverContent } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { UserSearch } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function ContactInput() {
  const [contactName, setContactName] = useState<string>('')
  const [contactSearch, setContactSearch] = useState<string>('')
  const [openContacts, setOpenContacts] = useState(false)

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ['contact', 1, contactSearch],
    queryFn: () =>
      getAllsContacts({
        page: '1',
        limit: '20',
        query: contactSearch ?? '',
      }),
    enabled: contactSearch !== '',
    refetchOnWindowFocus: false,
    retry: false,
  })

  const handleContactInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContactName(e.target.value)
    debounce(e.target.value)
  }

  const debounce = useDebouncedCallback((value: string) => {
    setContactSearch(value)
  }, 500)
  const contacts = data?.data ?? []
  console.log(openContacts)
  return (
    <>
      <div className="relative">
        <Input
          placeholder="Buscar contacto"
          onBlur={() => setOpenContacts(false)}
          onFocus={() => setOpenContacts(true)}
          startContent={
            <span className="opacity-70">
              <UserSearch width={18} height={18} />
            </span>
          }
          endContent={
            <span>{isFetching && <Spinner size={18} fill="#28a745" />}</span>
          }
          value={contactName}
          onChange={handleContactInputChange}
          labelPlacement="outside"
          variant="bordered"
          label="Persona de contacto"
        />
        {openContacts && (
          <div className="absolute dark:bg-zinc-950 w-full left-0 right-0 p-4 z-40">
            {contacts.map((contact) => {
              return (
                <div key={contact.id}>
                  <p>{contact.firstName}</p>
                  <p className="text-xs">{contact.email}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
