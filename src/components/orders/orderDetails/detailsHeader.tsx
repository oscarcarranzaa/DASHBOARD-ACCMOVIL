import { CustomerProfileSVG } from '@/components/icons/customerProfile'
import {
  Avatar,
  Button,
  Chip,
  Select,
  SelectItem,
  SelectProps,
  Selection,
} from '@nextui-org/react'
import dayjs from 'dayjs'
import { ReactNode, useEffect, useState } from 'react'
import { getDisabledKeys, ORDER_STATUS } from './orderStatus'
import { orderInfoSchema } from '@/types/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOrderState } from '@/api/order'
import { toast } from 'sonner'

type TProps = {
  orderId: string
  orderNumber: string
  completedAt?: string | null
  paymentAt?: string | null
  updatedAt?: string | null
  avatar?: string | null
  status: orderInfoSchema['status']
  name: string
  email: string | undefined
  children?: ReactNode
}
export const statusColorMap: Record<string, SelectProps['color']> = {
  completed: 'success',
  processing: 'primary',
  cancelled: 'default',
  failed: 'danger',
  refund: 'danger',
  pending: 'warning',
}
export default function OrderDetailsHeader({
  orderId,
  orderNumber,
  completedAt,
  paymentAt,
  avatar,
  updatedAt,
  name,
  status,
  email,
  children,
}: TProps) {
  const [statusSelect, setStatusSelect] = useState<Selection>(new Set([status]))
  const [prevKey, setPrevKey] = useState<Selection>(new Set([status]))
  const currentStatus = Array.from(statusSelect)[0]

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: updateOrderState,
    onSuccess: () => {
      setPrevKey(statusSelect)
      queryClient.invalidateQueries({ queryKey: ['order', orderId, 'details'] })
    },
    onError: (err) => {
      setStatusSelect(prevKey)
      toast.error(err.message ?? 'Error al cambiar el estado')
    },
  })
  const sendStatus = (st?: string) => {
    if (st && st !== currentStatus) {
      mutate({ id: orderId, status: st })
    }
  }
  const disabledKeys = currentStatus
    ? getDisabledKeys(currentStatus.toString())
    : ''
  useEffect(() => {
    setStatusSelect(new Set([status]))
  }, [status])
  return (
    <>
      <div className="border dark:border-zinc-700 border-zinc-300 p-5 rounded-xl ">
        <div className="flex justify-between ">
          <div className="flex flex-col gap-x-5">
            <div>
              <p className=" text-2xl font-bold">Pedido #{orderNumber}</p>
              <div className="flex gap-5">
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
                <div className=" flex gap-4">{children}</div>
              </div>
            </div>
            <div className=" flex gap-1 mt-5">
              {completedAt && (
                <Chip variant="flat" className=" text-xs">
                  Creada: {dayjs(completedAt).format('DD/MM/YY hh:mm A')}
                </Chip>
              )}
              {updatedAt && (
                <Chip variant="flat" className=" text-xs">
                  Ult. actualización:{' '}
                  {dayjs(updatedAt).format('DD/MM/YY hh:mm A')}
                </Chip>
              )}
              <Chip variant="flat" className=" text-xs">
                <p>
                  Pagado:{' '}
                  {paymentAt
                    ? dayjs(paymentAt).format('DD/MM/YY hh:mm A')
                    : 'NO'}
                </p>
              </Chip>
            </div>
          </div>
          <div className="w-60">
            <Select
              variant="flat"
              label="Cambiar Estado"
              isLoading={isPending}
              isDisabled={isPending}
              placeholder="Selecciona el estado"
              disabledKeys={disabledKeys}
              color={statusColorMap[currentStatus]}
              labelPlacement="outside"
              selectedKeys={statusSelect}
              onSelectionChange={(val) => {
                if (val) {
                  setStatusSelect(val)
                  if (val.currentKey) {
                    sendStatus(val.currentKey)
                  }
                }
              }}
              className="max-w-xs"
            >
              {ORDER_STATUS.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  )
}
