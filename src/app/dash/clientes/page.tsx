import CustomerList from '@/components/customers/customerList'
import NewCustomerForm from '@/components/customers/newCustomer'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import { Suspense } from 'react'

export default function CustomersHome() {
  return (
    <>
      <NavegationPages text="Clientes" />
      <div>
        <div className="mb-3 flex justify-between">
          <Suspense>
            <Search placeHolder="Buscar cliente..." />
          </Suspense>
          <NewCustomerForm />
        </div>
        <div className="mb-16">
          <Suspense>
            <CustomerList />
          </Suspense>
        </div>
      </div>
    </>
  )
}
