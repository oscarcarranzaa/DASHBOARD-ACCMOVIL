import ContactList from '@/components/customers/contacts/contactList'
import CreateContact from '@/components/customers/contacts/newContact'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import { Suspense } from 'react'

export default function Contactos() {
  return (
    <div>
      <NavegationPages text="Contactos" />
      <div>
        <div className="mb-3 flex justify-between">
          <Suspense>
            <Search placeHolder="Buscar contacto..." />
          </Suspense>
          <CreateContact />
        </div>
        <div className="mb-16">
          <Suspense>
            <ContactList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
