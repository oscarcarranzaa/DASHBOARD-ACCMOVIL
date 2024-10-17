'use client'
import NavegationPages from '@/components/navegationPages'
import NewOrder from '@/components/orders/newOrder'

export default function NewOrderPage() {
  return (
    <>
      <NavegationPages text="Nuevo pedido" />
      <div className="w-full">
        <NewOrder />
      </div>
    </>
  )
}
