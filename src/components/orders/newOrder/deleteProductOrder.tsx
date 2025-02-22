import { deleteProductOrder } from '@/api/order'
import Spinner from '@/components/icons/spinner'
import TrashSVG from '@/components/icons/trahs'
import { createOrderState } from '@/store/order'
import { Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function DeleteProductOrder({
  id,
  isSaved,
}: {
  id: string
  isSaved: boolean
}) {
  const deletedProduct = createOrderState((state) => state.deletedProduct)
  const resetOrder = createOrderState((state) => state.reset)
  const setOrderInfo = createOrderState((state) => state.setOrderInfo)

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProductOrder,
    onSuccess: (data) => {
      deletedProduct(data.item.productId)
      setOrderInfo(data.order)
    },
    onError: (err) => {
      toast.error(err.message)
      if (err.cause === 403) {
        return resetOrder()
      }
      if (err.cause === 404) {
        deletedProduct(id)
      }
    },
  })
  return (
    <Button
      isIconOnly
      variant="flat"
      size="sm"
      className="w-10 h-10"
      onPress={() => mutate(id)}
      isDisabled={!isSaved}
    >
      <span className="dark:stroke-white stroke-black">
        {isPending ? <Spinner size={16} fill="#777" /> : <TrashSVG size={16} />}
      </span>
    </Button>
  )
}
