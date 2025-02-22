'use client'
import Bank from '@/components/icons/bank'
import Money from '@/components/icons/money'
import PlusSVG from '@/components/icons/plus'
import {
  Button,
  Checkbox,
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { useState } from 'react'
import OrderCash from './cash'
import OrderBank from './bank'

const paymentMethods = [
  {
    name: 'Transferencia Bancaria',
    key: 'BANK_TRANSFER',
    description: 'Se  requiere foto del comprobante.',
    icon: <Bank size={42} />,
  },
  {
    name: 'Efectivo',
    key: 'CASH',
    description: 'Una forma de vender en físico.',
    icon: <Money size={42} />,
  },
] as const

type TProps = {
  totalAmount: number
  orderId: string
}
export default function PaidOrder({ totalAmount, orderId }: TProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [navegationPay, setNavegationPay] = useState<'select' | 'method'>(
    'select'
  )
  const [paymentMethod, setPaymentMethod] = useState<'BANK_TRANSFER' | 'CASH'>(
    'BANK_TRANSFER'
  )
  const checkClass = {
    base: cn(
      'inline-flex max-w-md bg-zinc-50 dark:bg-zinc-950 m-0',
      'hover:bg-zinc-100 dark:hover:bg-zinc-800 items-center justify-start',
      'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
      'data-[selected=true]:border-primary'
    ),
    label: 'w-full',
  }
  const renderHistoty = () => {
    switch (paymentMethod) {
      case 'CASH':
        return (
          <OrderCash
            totalAmount={totalAmount}
            orderId={orderId}
            onClose={onClose}
          />
        )
      case 'BANK_TRANSFER':
        return (
          <OrderBank
            totalAmount={totalAmount}
            orderId={orderId}
            onClose={onClose}
          />
        )
    }
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="border border-blue-600 border-dashed rounded-lg h-full flex justify-center items-center flex-col"
      >
        <div className="fill-blue-600">
          <PlusSVG size={42} />
        </div>
        <p className="text-sm">Agregar transacción</p>
        <p className="text-xs w-10/12 text-center opacity-70">
          No podrá continuar con un estado de finalizado exitoso sin antes una
          transacción.
        </p>
      </button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Agregar transacción</ModalHeader>
              {navegationPay === 'select' ? (
                <>
                  <div className="px-3 grid grid-cols-2 gap-2 mt-5 mb-5">
                    {paymentMethods.map((pay) => (
                      <Checkbox
                        key={pay.key}
                        aria-label={pay.name}
                        isSelected={paymentMethod === pay.key}
                        onChange={() => setPaymentMethod(pay.key)}
                        classNames={checkClass}
                      >
                        <div className="w-full flex justify-between gap-2">
                          <div>
                            <p className="font-semibold">{pay.name}</p>
                            <p className="text-xs opacity-70 font-semibold">
                              {pay.description}
                            </p>
                          </div>
                          <div className="dark:stroke-white stroke-black ml-10">
                            {pay.icon}
                          </div>
                        </div>
                      </Checkbox>
                    ))}
                  </div>
                  <div className="full flex justify-end p-3 gap-3">
                    <Button className=" min-w-32" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      className=" min-w-32"
                      color="primary"
                      onPress={() => setNavegationPay('method')}
                    >
                      Siguiente
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {renderHistoty()}
                  <div className="px-3 mt-1 mb-3">
                    <Button
                      className="w-full"
                      onPress={() => {
                        setNavegationPay('select')
                        onClose()
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
