import { CustomerProfileSVG } from '@/components/icons/customerProfile'
import { Avatar, Button, Chip } from '@nextui-org/react'
import dayjs from 'dayjs'
import { ReactNode } from 'react'

type TProps = {
  orderNumber: string
  completedAt?: string | null
  paymentAt?: string | null
  updatedAt?: string | null
  avatar?: string | null
  name: string
  email: string | undefined
  children?: ReactNode
}

export default function OrderDetailsHeader({
  orderNumber,
  completedAt,
  paymentAt,
  avatar,
  updatedAt,
  name,
  email,
  children,
}: TProps) {
  return (
    <>
      <div className="border dark:border-zinc-700 border-zinc-300 p-5 rounded-xl ">
        <div className="flex justify-between ">
          <div>
            <p className=" text-2xl font-bold">Pedido #{orderNumber}</p>
            <div className=" flex gap-2 mt-3">
              <Avatar
                src={avatar ?? undefined}
                icon={<CustomerProfileSVG size={50} />}
                showFallback
              />
              <div>
                <p className=" font-semibold">{name}</p>
                <p className=" text-xs opacity-80 ">{email}</p>
              </div>
            </div>
          </div>
          <div className=" flex gap-4">{children}</div>
        </div>
        <div className=" flex gap-1 mt-5">
          {completedAt && (
            <Chip variant="flat" className=" text-xs">
              Creada: {dayjs(completedAt).format('DD/MM/YY hh:mm A')}
            </Chip>
          )}
          {updatedAt && (
            <Chip variant="flat" className=" text-xs">
              Ult. actualización: {dayjs(updatedAt).format('DD/MM/YY hh:mm A')}
            </Chip>
          )}
          <Chip variant="flat" className=" text-xs">
            <p>
              Pagado:{' '}
              {paymentAt
                ? dayjs(paymentAt).format('DD/MM/YY hh:mm A')
                : 'Pendiente'}
            </p>
          </Chip>
        </div>
      </div>
    </>
  )
}
