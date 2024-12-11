'use client'
import { getAllsContacts } from '@/api/contact'
import ContactList from '@/components/customers/contacts/contactList'
import CreateContact from '@/components/customers/contacts/newContact'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const ROWS = 20
export default function Contactos() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const { data, isPending, error } = useQuery({
    queryKey: ['contact', currentPage.toString(), search],
    queryFn: () =>
      getAllsContacts({
        page: currentPage.toString(),
        limit: ROWS.toString(),
        query: search,
      }),
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  return (
    <div>
      <NavegationPages text="Contactos" />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar contacto..." />
          <CreateContact />
        </div>
        <div className="mb-16">
          <ContactList data={data} rows={ROWS} isPending={isPending} />
        </div>
      </div>
    </div>
  )
}
