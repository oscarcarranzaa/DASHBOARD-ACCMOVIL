import { deleteProductOrder } from '@/api/order'
import Spinner from '@/components/icons/spinner'
import TrashSVG from '@/components/icons/trahs'
import { createOrderState } from '@/store/order'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function DeleteProductOrder({ id }: { id: string }) {
  const deletedProduct = createOrderState((state) => state.deletedProduct)

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProductOrder,
    onSuccess: (data) => {
      deletedProduct(data.productId)
    },
    onError: (err) => {
      toast.error(err.message)
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
      onClick={() => mutate(id)}
    >
      <span className="dark:stroke-white stroke-black">
        {isPending ? <Spinner size={16} fill="#777" /> : <TrashSVG size={16} />}
      </span>
    </Button>
  )
}
