'use client'
import { createOrderState } from '@/store/order'
import AddProductOrder from './addProduct'
import OrderResume from './orderResume'
import OrderStatusBar from './orderStatusBar'
import ContactOrder from './contactOrder'
import ShippingOrderForm from './shippingForm'
import FinishOrder from './finishOrder'
import { useEffect, useState } from 'react'
import getCookie from '@/utils/cookiesOperator'
import { useQuery } from '@tanstack/react-query'
import { persistOrderQuery } from '@/api/order'

export default function NewOrder() {
  const [isOrderSession, setIsOrderSession] = useState<
    'pending' | 'empty' | 'exists'
  >('pending')
  const statusOrder = createOrderState((state) => state.orderNavegation)
  const { data, isPending } = useQuery({
    queryKey: ['order', 'persist'],
    queryFn: persistOrderQuery,
    enabled: isOrderSession === 'exists',
    retry: false,
  })

  console.log(data)
  const renderOrderStatus = (nav: string) => {
    switch (nav) {
      case 'details':
        return <AddProductOrder />
      case 'contact':
        return <ContactOrder />
      case 'shipping':
        return <ShippingOrderForm />
      case 'finish':
        return <FinishOrder />
    }
  }
  useEffect(() => {
    const isSession = getCookie('O_session')
    isSession ? setIsOrderSession('exists') : setIsOrderSession('empty')
  }, [])

  return (
    <>
      <OrderStatusBar />
      <div className="grid grid-cols-6 gap-3 mt-5 items-start">
        <div className="dark:bg-zinc-950 bg-zinc-50 p-5 rounded-xl col-span-4 border dark:border-zinc-700 border-zinc-300">
          {renderOrderStatus(statusOrder)}
        </div>
        <div className="col-span-2">
          <OrderResume />
        </div>
      </div>
    </>
  )
}
