import AddShoppingCartIcon from '@/components/icons/addShoppingCartIcon'
import EmptyOrder from './emptyOrder'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import SelectProduct from '@/components/products/selectProduct'
import { createOrderState } from '@/store/order'
import { Toaster } from 'sonner'
import ProductItems from './productItems'

export default function AddProductOrder() {
  const [openSelect, setOpenSelect] = useState(false)
  const setProduct = createOrderState((state) => state.addProduct)
  const productsInOrder = createOrderState((state) => state.products)
  const orderNavegation = createOrderState((state) => state.navegation)
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="font-semibold">Lista de productos</p>
          <Button color="primary" onClick={() => setOpenSelect(!openSelect)}>
            Agregar productos
          </Button>
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
                  onClick={() => orderNavegation('contact')}
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
          onSelectProduct={(value) =>
            setProduct({
              id: value.id,
              name: value.name,
              price: value.price,
              quantity: 1,
              stock: value.stock,
              sku: value.sku,
              media: value.media,
              discountPrice: value.discountPrice,
              startDiscount: value.startDiscount,
              endDiscount: value.endDiscount,
            })
          }
        />
      )}
    </>
  )
}
