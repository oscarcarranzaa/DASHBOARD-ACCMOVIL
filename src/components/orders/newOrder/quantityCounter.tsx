import { updateProductOrder } from '@/api/order'
import Spinner from '@/components/icons/spinner'
import { createOrderState } from '@/store/order'
import { Button } from '@nextui-org/button'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

export default function QuantityCounter({
  id,
  stock,
  quantity,
}: {
  id: string
  quantity: number
  stock: number
}) {
  const [quantitySuccess, setQuantitySuccess] = useState(quantity)
  const incrementalProduct = createOrderState((state) => state.incrementProduct)
  const decrementalProduct = createOrderState(
    (state) => state.decrementalProduct
  )
  const setQuantity = createOrderState((state) => state.setQuantity)
  console.log(quantity, quantitySuccess)
  // Actualizar las cantidades en el servidor
  const { mutate, isPending } = useMutation({
    mutationFn: updateProductOrder,
    onSuccess: (success) => {
      setQuantitySuccess(success.quantity)
    },
    onError: (err) => {
      setQuantity(id, quantitySuccess)
      toast.error(err.message)
    },
  })
  const disabledDecremental = quantity <= 1

  const debounce = useDebouncedCallback(() => {
    mutate({ id, quantity })
  }, 800)

  useEffect(() => {
    if (quantity !== quantitySuccess) {
      debounce()
    }
  }, [quantity])
  return (
    <>
      <div className="flex min-w-36 items-center">
        <Button
          isIconOnly
          size="sm"
          className=" w-5 h-5"
          variant="faded"
          onClick={() => {
            decrementalProduct(id)
          }}
          isDisabled={disabledDecremental || isPending}
        >
          -
        </Button>
        <p className="px-2 text-sm">{quantity}</p>
        <Button
          isIconOnly
          size="sm"
          className=" w-5 h-5"
          variant="faded"
          isDisabled={isPending}
          onClick={() => {
            incrementalProduct(id)
          }}
        >
          +
        </Button>
        {isPending && (
          <div className="ml-2">
            <Spinner size={18} fill="#666" />
          </div>
        )}
      </div>
    </>
  )
}
