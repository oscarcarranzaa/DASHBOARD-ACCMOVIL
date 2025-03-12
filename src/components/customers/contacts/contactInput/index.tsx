'use client'

import { getAllsContacts } from '@/api/contact'
import Spinner from '@/components/icons/spinner'
import useOutsideClick from '@/hooks/useOutSideClick'
import { Button, Chip, Input } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon, SearchX, UserSearch } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { contactSchema } from '@/types/customer'
import ContactItem from './contactItem'

type TProps = {
  onContactChange?: (contact: contactSchema) => void
  onNewContactChange?: (name: string) => void
  onClear?: () => void
  errors?: string
}
export default function ContactInput({
  onContactChange,
  onNewContactChange,
  onClear,
  errors,
}: TProps) {
  const [contactName, setContactName] = useState<string>('')
  const [contactSearch, setContactSearch] = useState<string>('')
  const [isNew, setIsNew] = useState(false)
  const [openContacts, setOpenContacts] = useState(false)
  const [selectContact, setSelectContact] = useState<contactSchema>()

  const ref = useRef<HTMLDivElement | null>(null)
  const { data, isFetching, error } = useQuery({
    queryKey: ['contact', 1, contactSearch],
    queryFn: () =>
      getAllsContacts({
        page: '1',
        limit: '20',
        query: contactSearch ?? '',
      }),
    enabled: contactSearch.length > 1,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const contacts = data?.data ?? []

  useOutsideClick(ref, () => setOpenContacts(false))

  const handleContactInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setContactName(inputValue)
    debounce(inputValue)

    if (inputValue.length < 2) {
      if (onClear) {
        onClear()
      }
      setIsNew(false)
      return
    }
    if (inputValue.length > 1 && !selectContact) {
      setIsNew(true)
    }
  }

  const debounce = useDebouncedCallback((value: string) => {
    setContactSearch(value)
  }, 500)

  const handleSelectContact = (person: contactSchema | undefined) => {
    //Logica para agregar un nuevo nombre de contacto
    if (!person && selectContact?.name !== contactName && onNewContactChange) {
      setSelectContact(undefined)
      if (contactName.length > 2) {
        onNewContactChange(contactName)
        setIsNew(true)
      }
      return
    }

    if (!person) return
    //Logica para seleccionar un contacto existente
    setIsNew(false)
    setOpenContacts(false)
    setContactName(person.name.trim())
    setSelectContact(person)
    if (onContactChange) {
      onContactChange(person)
    }
  }
  return (
    <>
      <div className="relative" ref={ref}>
        <Input
          isRequired
          isInvalid={!!errors}
          errorMessage={errors}
          placeholder="Buscar contacto"
          onFocus={() => {
            setOpenContacts(true)
          }}
          onBlur={() => {
            handleSelectContact(undefined)
          }}
          startContent={
            <span className="opacity-70">
              <UserSearch width={18} height={18} />
            </span>
          }
          endContent={
            <>
              <span>{isFetching && <Spinner size={18} fill="#28a745" />}</span>
              <span>
                {isNew && (
                  <Chip size="sm" variant="flat" color="primary">
                    Nuevo
                  </Chip>
                )}
              </span>
            </>
          }
          value={contactName}
          onChange={handleContactInputChange}
          labelPlacement="outside"
          variant="bordered"
          label="Persona de contacto"
        />
        {openContacts && error && (
          <div className="text-center flex gap-3 justify-center items-center py-8 text-sm text-red-500 mt-2 absolute dark:bg-zinc-950 bg-zinc-50 border-2 border-zinc-500 rounded-lg w-full left-0 right-0 p-1 z-40">
            <div className="flex-none">
              <SearchX size={18} />
            </div>
            <p className="text-xs">Hubo un problema al cargar los contactos.</p>
          </div>
        )}
        {openContacts && contactName.length > 1 && data && !error ? (
          <div className="absolute dark:bg-zinc-950  bg-zinc-50 border-2 border-zinc-500 rounded-lg w-full left-0 right-0 p-1 z-40">
            <div className="max-h-60 overflow-y-auto">
              {contacts.length === 0 ? (
                <div className="text-center flex gap-3 justify-center items-center py-2 text-sm text-zinc-500">
                  <SearchX size={18} /> <p>No se encontraron contactos</p>
                </div>
              ) : (
                <div className="grid">
                  {contacts.map((contact) => {
                    return (
                      <ContactItem
                        key={contact.id}
                        contact={contact}
                        isSelected={contact.id === selectContact?.id}
                        handleSelectContact={(e) => {
                          handleSelectContact(e)
                        }}
                      />
                    )
                  })}
                </div>
              )}
            </div>
            {selectContact?.name !== contactName && (
              <Button
                className="w-full mt-3 rounded h-14 text-blue-500 font-semibold"
                variant="flat"
                onPress={() => {
                  handleSelectContact(undefined)
                  setOpenContacts(false)
                }}
              >
                <span>
                  <PlusIcon width={20} height={20} strokeWidth={2} />
                </span>
                <div className="text-wrap text-left">{`Agregar a "${contactName}" como nuevo contacto`}</div>
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </>
  )
}
