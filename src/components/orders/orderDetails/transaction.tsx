import { orderDetailsRead } from '@/types/order'
import PaidOrder from './paid'
import dayjs from 'dayjs'
import { Chip } from "@heroui/react"
import { DeniedRedSVG } from '@/components/icons/deniedRed'

type TProps = {
  transaction?: orderDetailsRead['transaction'] | null
  orderId: string
  totalAmount: number
  orderStatus: orderDetailsRead['status']
}
const paymentMethods = {
  BANK_TRANSFER: 'Transferencia Bancaria Directa',
  CREDIT_CARD: 'Tarjeta de Crédito/Débito',
  PAYPAL: 'Paypal',
  CASH: 'Efectivo',
  OTHER: 'Otros',
}

const paymentStatus = {
  PENDING: {
    name: 'PENDIENTE',
    cls: 'warning',
    description: 'Aún no se ha pagado',
  },
  COMPLETED: {
    name: 'PAGADA',
    cls: 'success',
    description: 'Enhorabuena esta orden esta',
  },
  FAILED: {
    name: 'FALLIDA',
    cls: 'danger',
    description: 'Ocurrió un error en el pago',
  },
  CANCELLED: {
    name: 'CANCELEDO',
    cls: 'default',
    description: 'Se canceló la transacción',
  },
  REFUND: {
    name: 'REEMBOLSADO',
    cls: 'danger',
    description: 'Se reembolsó la trasacción.',
  },
} as const
export default function OrderTransaction({
  transaction,
  totalAmount,
  orderId,
  orderStatus,
}: TProps) {
  const totalPaid = Number(transaction?.totalPaid ?? 0)
  const isDisabled = orderStatus === 'cancelled' || orderStatus === 'failed'
  return (
    <>
      <div>
        {!transaction ? (
          isDisabled ? (
            <div className="border border-red-600 border-dashed rounded-lg h-full flex justify-center items-center flex-col">
              <div>
                <DeniedRedSVG size={42} />
              </div>
              <p className="text-sm">Ya no se puede agregar una transacción</p>
              <p className="text-xs w-10/12 text-center opacity-70">
                Tu orden pasó a estar en un estado donde ya no se puede agregar
                un pago porque, si fue un error te invitamos a crear un nuevo
                pedido.
              </p>
            </div>
          ) : (
            <PaidOrder totalAmount={totalAmount} orderId={orderId} />
          )
        ) : (
          <div>
            <p className=" font-semibold mb-1">Trasacción:</p>
            <ul>
              <li>
                Método de pago: {paymentMethods[transaction.paymentMethod]}
              </li>
              <li>Referencia: {transaction.reference ?? 'N/D'}</li>
              <li>
                Total pagado:{' '}
                {totalPaid.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </li>
              <li>
                Fecha de pago:{' '}
                {dayjs(transaction.paymentDate).format('DD/MM/YY hh:mm:ss A')}
              </li>
            </ul>
            <p className="mt-5 font-medium">Estado de pago:</p>
            <div className="w-full flex justify-center flex-col items-center">
              <p>{paymentStatus[transaction.paymentStatus].description}</p>
              <Chip
                size="lg"
                className="font-semibold"
                variant="bordered"
                color={paymentStatus[transaction.paymentStatus].cls}
              >
                {paymentStatus[transaction.paymentStatus].name}
              </Chip>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
