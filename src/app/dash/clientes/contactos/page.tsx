import ContactList from '@/components/customers/contacts/contactList'
import CreateContact from '@/components/customers/contacts/newContact'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'

export default function Contactos() {
  return (
    <div>
      <NavegationPages text="Contactos" />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar contacto..." />
          <CreateContact />
        </div>
        <div className="mb-16">
          <ContactList />
        </div>
      </div>
    </div>
  )
}
