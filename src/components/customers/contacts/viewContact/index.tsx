'use client'
import { useQuery } from '@tanstack/react-query'
import ContactHeader from './contactHeader'
import { getOneContact } from '@/api/contact'

export default function ViewContact({ contactID }: { contactID: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['contact', contactID],
    queryFn: () => getOneContact(contactID),
    retry: false,
    refetchOnWindowFocus: false,
  })
  return <div>{data && <ContactHeader contact={data} />}</div>
}
