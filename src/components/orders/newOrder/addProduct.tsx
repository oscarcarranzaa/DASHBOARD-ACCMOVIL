import EmptyOrder from './emptyOrder'
import { addToast, Button } from '@heroui/react'
import { Suspense, useState } from 'react'
import { createOrderState } from '@/store/order'
import ProductItems from './productItems'
import { useMutation } from '@tanstack/react-query'
import { addProductOrder } from '@/api/order'
import Spinner from '@/components/icons/spinner'
import ProductSelect from '@/components/publish/selectProduct'
import { Plus } from 'lucide-react'

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
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Error',
        description: error.message,
      })
    },
  })
  const productsId = productsInOrder.map((p) => p.id)
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
            <Button color="primary" onPress={() => setOpenSelect(!openSelect)}>
              <Plus size={20} /> Productos
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
                  onPress={() => {
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
        <Suspense>
          <ProductSelect
            openModal={openSelect}
            closeModal={() => setOpenSelect(false)}
            setValue={(p) => {
              if (productsId.includes(p.id)) {
                addToast({
                  color: 'warning',
                  variant: 'bordered',
                  timeout: 5000,
                  title: 'Producto ya agregado',
                  description: 'El producto ya se encuentra en la lista',
                })
                return
              }
              if (p) {
                mutate(p.id)
                setProductId(p.id)
                setProduct({
                  id: p.id,
                  name: p.name,
                  isSaved: false,
                  price: p.price,
                  quantity: 1,
                  stock: p.stock,
                  sku: p.sku,
                  media: p.media,
                  discountPrice: p.discountPrice,
                  startDiscount: p.startDiscount,
                  endDiscount: p.endDiscount,
                })
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}
