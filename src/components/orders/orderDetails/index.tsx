'use client'
import { useQuery } from '@tanstack/react-query'
import OrderDetailsHeader from './detailsHeader'
import OrderHistory from './orderHistory'
import OrderProductsResume from './orderResume'
import { useParams } from 'next/navigation'
import { getOrderDetails } from '@/api/order'
import OrderTrackDetails from './orderTrack'
import { Button } from '@nextui-org/react'
import OrderEdit from '../editOrder'
import OrderTransaction from './transaction'

export default function OrderDetails() {
  const params = useParams()
  const id = params.orderId
  const { data } = useQuery({
    queryKey: ['order', id.toString(), 'details'],
    queryFn: () => getOrderDetails(id.toString()),
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {data && (
        <div className="mb-10">
          <OrderDetailsHeader
            orderId={data.id}
            orderNumber={data.orderId}
            status={data.status}
            completedAt={data.completedAt}
            updatedAt={data.updatedAt}
            paymentAt={data.transaction?.paymentDate}
            name={`${data.billingInfo?.firstName} ${data.billingInfo?.lastName}${!data.customerId ? ' (Invitado)' : ''}`}
            avatar={data.customer?.avatar}
            email={data.billingInfo?.email}
          >
            <OrderEdit
              shippingInfo={data.shippingInfo}
              billingInfo={data.billingInfo}
            />
          </OrderDetailsHeader>

          <div className="mt-5 grid grid-cols-12 gap-5">
            <div className=" col-span-8">
              <div className="grid grid-cols-2 gap-3  border dark:border-zinc-700 border-zinc-300 rounded-xl p-5">
                <OrderTrackDetails
                  shippingInfo={data.shippingInfo}
                  orderId={data.id}
                />
                <OrderTransaction
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
      )}
    </>
  )
}
