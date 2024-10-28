import NavegationPages from '@/components/navegationPages'
import OrderDetails from '@/components/orders/orderDetails'

export default function OrderDetailsPage() {
  return (
    <>
      <NavegationPages text="Detallles del pedido" />
      <OrderDetails />
    </>
  )
}
