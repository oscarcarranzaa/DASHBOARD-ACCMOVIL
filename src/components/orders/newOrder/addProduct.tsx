import EmptyOrder from './emptyOrder'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import SelectProduct from '@/components/products/selectProduct'
import { createOrderState } from '@/store/order'
import ProductItems from './productItems'
import { useMutation } from '@tanstack/react-query'
import { addProductOrder } from '@/api/order'
import { toast } from 'sonner'
import Spinner from '@/components/icons/spinner'

export default function AddProductOrder() {
  const [productId, setProductId] = useState('')
  const [openSelect, setOpenSelect] = useState(false)

  const setProduct = createOrderState((state) => state.addProduct)
  const productsInOrder = createOrderState((state) => state.products)
  const setOrderNavegation = createOrderState((state) => state.navegation)
  const orderNavegation = createOrderState((state) => state.orderNavegation)
  const setCompletedNavegation = createOrderState(
    (state) => state.setCompletedNavegation
  )
  const setIsSaveProduct = createOrderState((state) => state.setIsSaveProduct)
  const deletedProduct = createOrderState((state) => state.deletedProduct)
  const setOrderInfo = createOrderState((state) => state.setOrderInfo)

  const { mutate, isPending } = useMutation({
    mutationFn: addProductOrder,
    onSuccess: (success) => {
      setIsSaveProduct(success.product.id)
      setOrderInfo(success.order)
    },
    onError: (error) => {
      deletedProduct(productId)
      toast.error(error.message)
    },
  })
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="font-semibold">Lista de productos</p>
          <div className=" flex items-center">
            {isPending && (
              <div className="mr-2">
                <Spinner size={24} fill="#777" />
              </div>
            )}
            <Button color="primary" onClick={() => setOpenSelect(!openSelect)}>
              Agregar productos
            </Button>
          </div>
        </div>
        <div className="w-full mt-5">
          {productsInOrder.length === 0 ? (
            <EmptyOrder size={100} />
          ) : (
            <>
              <ProductItems />
              <div className=" float-right mt-5">
                <Button
                  color="primary"
                  disabled={productsInOrder.length === 0}
                  onClick={() => {
                    setOrderNavegation('contact')
                    setCompletedNavegation(orderNavegation)
                  }}
                >
                  Continuar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {openSelect && (
        <SelectProduct
          open={setOpenSelect}
          onSelectProduct={(value) => {
            const findProduct = productsInOrder.find((p) => p.id === value.id)
            if (!findProduct) {
              mutate(value.id)
            }
            setProductId(value.id)
            setProduct({
              id: value.id,
              name: value.name,
              price: value.price,
              quantity: 1,
              isSaved: false,
              stock: value.stock,
              sku: value.sku,
              media: value.media,
              discountPrice: value.discountPrice,
              startDiscount: value.startDiscount,
              endDiscount: value.endDiscount,
            })
          }}
        />
      )}
    </>
  )
}
