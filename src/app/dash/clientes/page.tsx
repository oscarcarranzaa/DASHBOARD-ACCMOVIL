'use client'
import { getAllCustomer } from '@/api/customer'
import CustomerList from '@/components/customers/customerList'
import NewCustomerForm from '@/components/customers/newCustomer'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const rows = 20
export default function CustomersHome() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const { data, isPending, error } = useQuery({
    queryKey: ['customer', currentPage.toString(), search],
    queryFn: () =>
      getAllCustomer(currentPage.toString(), rows.toString(), search),
    refetchOnWindowFocus: false,
    retry: false,
  })
  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  return (
    <>
      <NavegationPages
        text={data ? 'Área de clientes' : 'Cargando clientes...'}
      />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar cliente..." />
          <NewCustomerForm />
        </div>
        <div className="mb-16">
          <CustomerList data={data} rows={rows} isPending={isPending} />
        </div>
      </div>
    </>
  )
}
