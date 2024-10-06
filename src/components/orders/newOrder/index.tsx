'use client'
import { createOrderState } from '@/store/order'
import AddProductOrder from './addProduct'
import OrderResume from './orderResume'
import OrderStatusBar from './orderStatusBar'
import ContactOrder from './contactOrder'

export default function NewOrder() {
  //<AddProductOrder />
  return (
    <>
      <OrderStatusBar />
      <div className="grid grid-cols-6 gap-3 mt-5">
        <div className="dark:bg-zinc-950 bg-zinc-100 p-5 rounded-xl col-span-4">
          <ContactOrder />
        </div>
        <div className="col-span-2">
          <OrderResume />
        </div>
      </div>
    </>
  )
}