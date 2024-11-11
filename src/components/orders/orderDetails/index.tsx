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
            <Button color="danger" variant="bordered">
              Reembolsar
            </Button>
            <OrderEdit
              shippingInfo={data.shippingInfo}
              billingInfo={data.billingInfo}
            />
          </OrderDetailsHeader>

          <div className="mt-5 grid grid-cols-6 gap-5">
            <div className=" col-span-4">
              <OrderProductsResume
                orderItems={data.orderItems}
                order={data}
                coupon={data.coupon}
              />
              <OrderTrackDetails shippingInfo={data.shippingInfo} />
            </div>
            <div className=" col-span-2">
              <OrderHistory history={data.OrderHistory} orderId={data.id} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
