'use client'
import ViewContact from '@/components/customers/contacts/viewContact'
import NavegationPages from '@/components/navegationPages'
import { useParams } from 'next/navigation'

export default function ContactView() {
  const params = useParams()
  const { contactID } = params as { contactID: string }
  return (
    <div>
      <NavegationPages text="Editar contacto" />
      <ViewContact contactID={contactID} />
    </div>
  )
}
