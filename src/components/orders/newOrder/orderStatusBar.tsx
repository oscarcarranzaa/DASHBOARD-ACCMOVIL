'use client'
import CheckSVG from '@/components/icons/check'
import InformationSVG from '@/components/icons/information'
import InvoiceCheck from '@/components/icons/invoiceCheck'
import Shipping from '@/components/icons/shipping'
import Smartphone from '@/components/icons/smartphone'
import { createOrderState } from '@/store/order'
import { Button } from '@nextui-org/react'

type TOptions = {
  name: string
  icon: JSX.Element
  key: 'details' | 'contact' | 'shipping' | 'finish'
}[]
export default function OrderStatusBar() {
  const options: TOptions = [
    {
      name: 'Detalles del pedido',
      icon: <InformationSVG size={32} />,
      key: 'details',
    },
    {
      name: 'Contacto',
      icon: <Smartphone size={32} />,
      key: 'contact',
    },
    {
      name: 'Dirección de envío',
      icon: <Shipping size={32} />,
      key: 'shipping',
    },
    {
      name: 'Finalizar pedido',
      icon: <InvoiceCheck size={32} />,
      key: 'finish',
    },
  ]
  const setNavegation = createOrderState((state) => state.navegation)
  const completedNavegation = createOrderState(
    (state) => state.completedNavegation
  )
  const orderNavegation = createOrderState((state) => state.orderNavegation)
  return (
    <>
      <div className="relative  dark:bg-zinc-950 bg-white h-28 p-5 w-full rounded-2xl dark:border-zinc-700 border-zinc-300 border-2">
        <div className="h-1 absolute dark:bg-zinc-600 bg-zinc-300 top-12 left-14 right-14 rounded-xl "></div>
        <div className="z-20  absolute right-0 left-0 px-5">
          <div className="flex justify-between">
            {options.map((op) => {
              const active = completedNavegation.find((nav) => nav === op.key)
              const isSelect = orderNavegation === op.key

              return (
                <div
                  className="fill-white  w-32  flex justify-center items-center flex-col"
                  key={op.key}
                >
                  <Button
                    isIconOnly
                    color={active || isSelect ? 'primary' : 'default'}
                    onClick={() => setNavegation(op.key)}
                    isDisabled={!active}
                    className={`rounded-full w-14 h-14 flex justify-center items-center opacity-100 hover:opacity-100 `}
                  >
                    {active && !isSelect ? (
                      <div className="stroke-zinc-200">
                        <CheckSVG size={32} />
                      </div>
                    ) : (
                      op.icon
                    )}
                  </Button>
                  <p
                    className={`text-xs mt-1 ${!isSelect && ' dark:text-zinc-500 text-zinc-400 text-sm'} font-medium`}
                  >
                    {op.name}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
