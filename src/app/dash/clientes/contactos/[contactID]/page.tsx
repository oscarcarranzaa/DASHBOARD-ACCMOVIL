import ViewContact from '@/components/customers/contacts/viewContact'
import NavegationPages from '@/components/navegationPages'

export default async function ContactView({
  params,
}: {
  params: Promise<{ contactID: string }>
}) {
  const { contactID } = await params
  return (
    <div>
      <NavegationPages text="Editar contacto" />
      <ViewContact contactID={contactID} />
    </div>
  )
}
