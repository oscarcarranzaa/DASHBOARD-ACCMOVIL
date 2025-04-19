import OrderDetails from '@/components/orders/orderDetails'
import { Suspense } from 'react'
export default function OrderDetailsPage() {
  return (
    <>
      <Suspense>
        <OrderDetails />
      </Suspense>
    </>
  )
}
