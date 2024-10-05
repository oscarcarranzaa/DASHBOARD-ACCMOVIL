'use client'
import NavegationPages from '@/components/navegationPages'
import NewOrder from '@/components/orders/newOrder'

export default function NewOrderPage() {
  return (
    <>
      <NavegationPages text="Nueva pedido" />
      <div className="w-full">
        <NewOrder />
      </div>
    </>
  )
}
