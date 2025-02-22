import { orderPaidByCash } from '@/api/order'
import Money from '@/components/icons/money'
import Spinner from '@/components/icons/spinner'
import { Button } from '@heroui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type TProps = {
  orderId: string
  totalAmount: number
  onClose: () => void
}
export default function OrderCash({ orderId, totalAmount, onClose }: TProps) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: orderPaidByCash,
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['order', orderId, 'details'] })
      toast.success('Transacción agregada.')
    },
    onError: () => {
      toast.error('Ocurrion un error.')
    },
  })
  const handlePaid = () => {
    mutate({ id: orderId, totalAmount: totalAmount })
  }
  return (
    <>
      <div className="px-3 w-full flex flex-col justify-center">
        <div className="dark:stroke-white stroke-black flex flex-col items-center">
          <Money size={48} />
          <p className=" font-semibold ">Pago en efectivo</p>
          <p className=" text-xs">
            Paga esta orden con efectivo únicamente si asi se requiere.
          </p>
        </div>
        <div className="mt-5 w-full">
          <Button
            color="success"
            className="w-full stroke-black stroke-2"
            onPress={handlePaid}
            isDisabled={isPending}
          >
            {isPending ? (
              <Spinner fill="#000" size={26} />
            ) : (
              <Money size={26} />
            )}
            <p className="font-semibold">
              Pagar{' '}
              {totalAmount.toLocaleString('es-HN', {
                style: 'currency',
                currency: 'HNL',
              })}
            </p>
          </Button>
        </div>
      </div>
    </>
  )
}
