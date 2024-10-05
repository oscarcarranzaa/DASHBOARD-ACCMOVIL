import { createOrderState } from '@/store/order'
import { Button } from '@nextui-org/button'

export default function QuantityCounter({
  id,
  stock,
  quantity,
}: {
  id: string
  quantity: number
  stock: number
}) {
  const incrementalProduct = createOrderState((state) => state.incrementProduct)
  const decrementalProduct = createOrderState(
    (state) => state.decrementalProduct
  )
  const disabledDecremental = quantity <= 1
  return (
    <>
      <div className="flex ">
        <Button
          isIconOnly
          size="sm"
          className=" w-5 h-5"
          variant="faded"
          onClick={() => decrementalProduct(id)}
          disabled={disabledDecremental}
        >
          -
        </Button>
        <p className="px-2 text-sm">{quantity}</p>
        <Button
          isIconOnly
          size="sm"
          className=" w-5 h-5"
          variant="faded"
          onClick={() => incrementalProduct(id)}
        >
          +
        </Button>
      </div>
    </>
  )
}
