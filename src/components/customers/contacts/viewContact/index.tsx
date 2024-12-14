'use client'
import { useQuery } from '@tanstack/react-query'
import ContactHeader from './contactHeader'
import { getOneContact } from '@/api/contact'
import SideInformationContact from './sideInformation'
import ContactNavegation from './navegation'

export default function ViewContact({ contactID }: { contactID: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['contact', contactID],
    queryFn: () => getOneContact(contactID),
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (!data) return
  return (
    <div>
      <ContactHeader contact={data} />
      <div className="grid grid-cols-9 mt-5 gap-3">
        <div className=" col-span-6 border border-zinc-300 dark:border-zinc-700 rounded-lg p-3">
          <ContactNavegation contact={data} />
        </div>
        <div className=" col-span-3">
          <SideInformationContact contact={data} />
        </div>
      </div>
    </div>
  )
}
