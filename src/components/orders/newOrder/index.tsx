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
import FinaliceOrderDetail from './finaliceOrderDetails'
import ShippingOrder from './shipping'

export default function NewOrder() {
  const [isOrderSession, setIsOrderSession] = useState<
    'pending' | 'empty' | 'exists'
  >('pending')

  const setOrderData = createOrderState((state) => state.setOrderData)
  const statusOrder = createOrderState((state) => state.orderNavegation)
  const successOrderId = createOrderState((state) => state.orderSuccessId)
  const setNavegation = createOrderState((state) => state.navegation)

  const { data, isPending } = useQuery({
    queryKey: ['order', 'persist'],
    queryFn: persistOrderQuery,
    enabled: isOrderSession === 'exists',
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      setOrderData(data)
    }
  }, [data, setOrderData])

  const renderOrderStatus = (nav: string) => {
    switch (nav) {
      case 'details':
        return <AddProductOrder />
      case 'contact':
        return <ContactOrder />
      case 'shipping':
        return <ShippingOrder />
      case 'finish':
        return <FinishOrder />
    }
  }
  useEffect(() => {
    const isSession = getCookie('O_session')
    isSession ? setIsOrderSession('exists') : setIsOrderSession('empty')
  }, [])
  if (statusOrder == 'finalice') {
    return <FinaliceOrderDetail id={successOrderId} />
  }
  return (
    <>
      <OrderStatusBar />
      <div className="grid grid-cols-6 gap-3 mt-8 items-start">
        <div className="dark:bg-zinc-950 bg-white shadow-xl p-5 rounded-xl col-span-4 border dark:border-zinc-700 border-zinc-300">
          {renderOrderStatus(statusOrder)}
        </div>
        <div className="col-span-2">
          <OrderResume />
        </div>
      </div>
    </>
  )
}
