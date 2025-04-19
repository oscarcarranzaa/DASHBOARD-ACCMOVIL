import CustomerList from '@/components/customers/customerList'
import NewCustomerForm from '@/components/customers/newCustomer'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'

export default function CustomersHome() {
  return (
    <>
      <NavegationPages text="Clientes" />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar cliente..." />
          <NewCustomerForm />
        </div>
        <div className="mb-16">
          <CustomerList />
        </div>
      </div>
    </>
  )
}
