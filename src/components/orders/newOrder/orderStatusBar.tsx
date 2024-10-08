'use client'
import InformationSVG from '@/components/icons/information'
import InvoiceCheck from '@/components/icons/invoiceCheck'
import Shipping from '@/components/icons/shipping'
import Smartphone from '@/components/icons/smartphone'
import { createOrderState } from '@/store/order'
import { Button } from '@nextui-org/react'

export default function OrderStatusBar() {
  const orderNavegation = createOrderState((state) => state.orderNavegation)
  const productsOrder = createOrderState((state) => state.products)

  const disabledContact = productsOrder.length === 0
  return (
    <>
      <div className="relative  dark:bg-zinc-950 bg-zinc-100 h-28 p-5 w-full rounded-2xl">
        <div className="h-1 absolute dark:bg-zinc-400 bg-zinc-500 top-12 left-5 right-5"></div>
        <div className="z-50  absolute right-0 left-0 px-5">
          <div className="flex justify-between">
            <div className="fill-white w-32  flex justify-center items-center flex-col">
              <Button
                isIconOnly
                color="primary"
                className=" rounded-full w-16 h-16 flex justify-center items-center"
                size="sm"
              >
                <InformationSVG size={32} />
              </Button>
              <p className="text-xs mt-1">Detalles del pedido</p>
            </div>
            <div className=" fill-white w-32 flex justify-center items-center flex-col">
              <Button
                isIconOnly
                color={disabledContact ? 'default' : 'primary'}
                className=" rounded-full w-16 h-16 flex justify-center items-center"
                size="sm"
                disabled={disabledContact}
              >
                <Smartphone size={32} />
              </Button>
              <p className="text-xs mt-1">Contacto</p>
            </div>
            <div className="fill-white w-32 overflow-hidden flex justify-center items-center flex-col">
              <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center">
                <Shipping size={32} />
              </div>
              <p className="text-xs mt-1">Dirección de envío</p>
            </div>
            <div className="fill-white w-32 overflow-hidden flex justify-center items-center flex-col">
              <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center">
                <InvoiceCheck size={32} />
              </div>
              <p className="text-xs mt-1">Finalizar pedido</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
