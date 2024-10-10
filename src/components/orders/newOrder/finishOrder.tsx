import Bank from '@/components/icons/bank'
import ClockSVG from '@/components/icons/clock'
import Money from '@/components/icons/money'
import { CheckboxGroup, Checkbox, cn, Button } from '@nextui-org/react'
import { useState } from 'react'
import FinishOrderBankTransfer from './finishOrderBankTransfer'

export default function FinishOrder() {
  const [paymentMethod, setPaymentMethod] = useState<'BANK_TRANSFER' | 'CASH'>()
  const checkClass = {
    base: cn(
      'inline-flex max-w-md  bg-content1 m-0',
      'hover:bg-zinc-50 dark:hover:bg-zinc-800 items-center justify-start ',
      'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
      'data-[selected=true]:border-primary  '
    ),
    label: 'w-full',
  }
  const handlePaymentMethod = (value: 'BANK_TRANSFER' | 'CASH') => {
    if (paymentMethod === value) {
      setPaymentMethod(undefined)
      return
    }
    setPaymentMethod(value)
  }
  return (
    <>
      <div>
        <p className="font-semibold">Finalizar orden</p>
        <div className="flex gap-x-3 flex-wrap mt-5">
          <Checkbox
            aria-label="Transferencia bancaria"
            isSelected={paymentMethod === 'BANK_TRANSFER'}
            onChange={() => handlePaymentMethod('BANK_TRANSFER')}
            classNames={checkClass}
          >
            <div className="w-full flex justify-between gap-2">
              <div>
                <p className=" font-semibold">Transferencia Bancaria</p>
                <p className=" text-xs opacity-70 font-semibold">
                  Se require foto del comprobante.
                </p>
              </div>
              <div className=" dark:stroke-white stroke-black ml-10">
                <Bank size={42} />
              </div>
            </div>
          </Checkbox>
          <Checkbox
            aria-label="Efectivo"
            isSelected={paymentMethod === 'CASH'}
            onChange={() => handlePaymentMethod('CASH')}
            classNames={checkClass}
          >
            <div className="w-full flex justify-between gap-2">
              <div>
                <p className=" font-semibold">Efectivo</p>
                <p className=" text-xs opacity-70 font-semibold">
                  Una forma de vender en fisico.
                </p>
              </div>
              <div className=" dark:stroke-white stroke-black ml-10">
                <Money size={42} />
              </div>
            </div>
          </Checkbox>
        </div>
        <div className="mt-14 mb-5">
          {!paymentMethod && (
            <Button
              className="w-full stroke-white stroke-2"
              color="danger"
              size="lg"
            >
              <ClockSVG size={26} />
              Dejar pendiente pago
            </Button>
          )}
          {paymentMethod === 'CASH' && (
            <Button
              className="w-full stroke-black stroke-2"
              color="success"
              size="lg"
            >
              <Money size={32} />
              Pagar en efectivo
            </Button>
          )}
          {paymentMethod === 'BANK_TRANSFER' && <FinishOrderBankTransfer />}
        </div>
      </div>
    </>
  )
}
