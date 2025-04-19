'use client'
import NavegationPages from '@/components/navegationPages'
import OrderList from '@/components/orders/orderList'
import Search from '@/components/UI/search'
import { Button } from '@heroui/react'
import Link from 'next/link'
import { Suspense } from 'react'

export default function CustomersHome() {
  return (
    <>
      <NavegationPages text="Pedidos" />
      <div>
        <div className="mb-3 flex justify-between">
          <Suspense>
            <Search placeHolder="Buscar pedidos..." />
          </Suspense>
          <Button color="primary" href="/dash/pedidos/nuevo" as={Link}>
            Nuevo pedido
          </Button>
        </div>
        <div className="mb-16">
          <Suspense>
            <OrderList />
          </Suspense>
        </div>
      </div>
    </>
  )
}
