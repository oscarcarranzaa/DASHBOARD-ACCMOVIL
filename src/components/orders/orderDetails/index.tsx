'use client'
import { useQuery } from '@tanstack/react-query'
import OrderDetailsHeader from './detailsHeader'
import OrderHistory from './orderHistory'
import OrderProductsResume from './orderResume'
import { useParams } from 'next/navigation'
import { getOrderDetails } from '@/api/order'
import OrderTrackDetails from './orderTrack'
import OrderEdit from '../editOrder'
import OrderTransaction from './transaction'
import OrderDetailSkeleton from './skeleton'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'

type paramsID = {
  orderId: string
}
export default function OrderDetails() {
  const params: paramsID = useParams()
  const id = params.orderId

  const { data, error } = useQuery({
    queryKey: ['order', id, 'details'],
    queryFn: () => getOrderDetails(id),
    refetchOnWindowFocus: false,
  })
  if (error) {
    return (
      <ErrorsPages
        errorRef={error.cause}
        message="Ocurrio un error con tu pedido, es posible que se haya eliminado o que no este disponible."
      />
    )
  }
  return (
    <>
      <NavegationPages text="Detallles del pedido" />
      {data ? (
        <div className="mb-10">
          <OrderDetailsHeader
            orderId={data.id}
            orderNumber={data.orderId}
            status={data.status}
            completedAt={data.completedAt}
            updatedAt={data.updatedAt}
            paymentAt={data.transaction?.paymentDate}
            name={`${data.billingInfo?.name}`}
            avatar={data.customer?.avatar}
            email={data.billingInfo?.email}
          ></OrderDetailsHeader>

          <div className="mt-5 grid grid-cols-12 gap-5">
            <div className=" col-span-8">
              <div className="grid grid-cols-2 gap-3  border dark:border-zinc-700 border-zinc-300 rounded-xl p-5">
                <OrderTrackDetails
                  orderStatus={data.status}
                  shippingInfo={data.shippingInfo}
                  orderId={data.id}
                />
                <OrderTransaction
                  orderStatus={data.status}
                  totalAmount={data.totalAmount}
                  orderId={data.id}
                  transaction={data.transaction}
                />
              </div>
              <div className="mt-5">
                <OrderProductsResume
                  orderItems={data.orderItems}
                  order={data}
                  coupon={data.coupon}
                />
              </div>
            </div>
            <div className=" col-span-4">
              <OrderHistory history={data.OrderHistory} orderId={data.id} />
            </div>
          </div>
        </div>
      ) : (
        <OrderDetailSkeleton />
      )}
    </>
  )
}
