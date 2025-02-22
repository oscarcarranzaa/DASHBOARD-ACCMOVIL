/* eslint-disable react-hooks/exhaustive-deps */
import { updateProductOrder } from '@/api/order'
import Spinner from '@/components/icons/spinner'
import { createOrderState } from '@/store/order'
import { Button } from '@heroui/button'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

export default function QuantityCounter({
  id,
  quantity,
  isSaved,
}: {
  id: string
  quantity: number
  isSaved: boolean
}) {
  const [quantitySuccess, setQuantitySuccess] = useState(quantity)
  const incrementalProduct = createOrderState((state) => state.incrementProduct)
  const decrementalProduct = createOrderState(
    (state) => state.decrementalProduct
  )
  const setQuantity = createOrderState((state) => state.setQuantity)
  const resetOrder = createOrderState((state) => state.reset)
  const setOrderInfo = createOrderState((state) => state.setOrderInfo)

  // Actualizar las cantidades en el servidor
  const { mutate, isPending } = useMutation({
    mutationFn: updateProductOrder,
    onSuccess: (success) => {
      setQuantitySuccess(success.item.quantity)
      setOrderInfo(success.order)
    },
    onError: (err) => {
      if (err.cause === 403) {
        return resetOrder()
      }
      setQuantity(id, quantitySuccess)
      toast.error(err.message)
    },
  })
  const disabledDecremental = quantity <= 1

  const debounce = useDebouncedCallback(() => {
    mutate({ id, quantity })
  }, 400)

  useEffect(() => {
    if (quantity !== quantitySuccess) {
      debounce()
    }
  }, [quantity, quantitySuccess])

  return (
    <>
      <div className="flex min-w-36 items-center">
        <Button
          isIconOnly
          size="sm"
          className=" w-5 h-5"
          variant="faded"
          onPress={() => {
            decrementalProduct(id)
          }}
          isDisabled={disabledDecremental || isPending || !isSaved}
        >
          -
        </Button>
        <p className="px-2 text-sm">{quantity}</p>
        <Button
          isIconOnly
          size="sm"
          className=" w-5 h-5"
          variant="faded"
          isDisabled={isPending || !isSaved}
          onPress={() => {
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
