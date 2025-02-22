'use client'
import { getAllCustomer } from '@/api/customer'
import { getAllsOrder } from '@/api/order'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import OrderList from '@/components/orders/orderList'
import Search from '@/components/UI/search'
import { Button } from "@heroui/button"
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ROWS = 15
export default function CustomersHome() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const { data, error, isPending } = useQuery({
    queryKey: ['order', currentPage.toString(), search],
    queryFn: () =>
      getAllsOrder({
        page: currentPage.toString(),
        limit: ROWS.toString(),
        q: search,
      }),
  })

  return (
    <>
      <NavegationPages text={data ? 'Pedidos' : 'Cargando los pedidos...'} />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar pedidos..." />
          <Button color="primary" href="/dash/pedidos/nuevo" as={Link}>
            Nuevo pedido
          </Button>
        </div>
        <div className="mb-16">
          <OrderList data={data} rows={ROWS} isPending={isPending} />
        </div>
      </div>
    </>
  )
}
