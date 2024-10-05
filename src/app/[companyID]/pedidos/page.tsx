'use client'
import { getAllCustomer } from '@/api/customer'
import CustomerList from '@/components/customers/customerList'
import NewCustomerForm from '@/components/customers/newCustomer'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import { Button } from '@nextui-org/button'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
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
      <NavegationPages text={data ? 'Pedidos' : 'Cargando los pedidos...'} />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar ordenes..." />
          <Button color="primary" href="/dash/pedidos/nuevo" as={Link}>
            Crear pedido
          </Button>
        </div>
        <div className="mb-16">
          <CustomerList data={data} rows={rows} isPending={isPending} />
        </div>
      </div>
    </>
  )
}
