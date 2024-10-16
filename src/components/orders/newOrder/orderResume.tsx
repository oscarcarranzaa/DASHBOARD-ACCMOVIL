'use client'

import DisplayPrice from '@/components/displayPrice'
import { createOrderState } from '@/store/order'
import CalcSubToltalOrder from '@/utils/calcSubTotalOrder'
import { Avatar, Badge, Input } from '@nextui-org/react'
import RendeemCoupon from '../coupon/rendeemCoupon'

export default function OrderResume() {
  const orderProducts = createOrderState((state) => state.products)
  const productsTotal = orderProducts.map((p) => {
    return {
      price: p.price,
      quantity: p.quantity,
      startDiscount: p.startDiscount,
      endDiscount: p.endDiscount,
      discountPrice: p.discountPrice,
    }
  })
  const { total, subtotal, discount } = CalcSubToltalOrder({
    items: productsTotal,
  })
  return (
    <>
      <div className=" bg-zinc-50 border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 rounded-lg">
        <div className="px-3">
          <div>
            <p className=" font-medium py-3 px-2">Resumen del pedido</p>
          </div>
          <div>
            {orderProducts.length === 0 && (
              <p className=" text-center mt-5 mb-5">
                Comienza agregado productos a la lista.
              </p>
            )}
            <ul>
              {orderProducts.map((p) => {
                const image = p.media
                  ? p.media.qualities[0].src
                  : '/static/product.webp'
                return (
                  <li key={p.id}>
                    <div className=" flex p-2">
                      <div className="w-16 flex-none ">
                        <Badge
                          content={p.quantity}
                          color="danger"
                          shape="rectangle"
                        >
                          <Avatar
                            isBordered
                            className=" rounded-lg"
                            src={image}
                            size="lg"
                          />
                        </Badge>
                      </div>
                      <div className="text-sm ml-1">
                        <p className=" font-medium line-clamp-2">{p.name}</p>
                        <DisplayPrice
                          price={p.price}
                          discountPrice={p.discountPrice}
                          startDate={p.startDiscount}
                          endDate={p.endDiscount}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="mt-5 border-t border-zinc-300 px-2">
            {orderProducts.length > 0 && (
              <div className="py-5">
                <RendeemCoupon />
              </div>
            )}
          </div>
          <ul className=" px-2 pb-5">
            <li className="mt-2 flex justify-between text-sm">
              <p>Subtotal:</p>
              <p>
                {subtotal.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </p>
            </li>
            <li className=" flex justify-between text-sm text-red-500 font-semibold">
              <p>Descuento:</p>
              <p>
                {discount.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </p>
            </li>
            <li className=" flex justify-between font-bold mt-2 text-lg">
              <p>Total:</p>
              <p>
                {total.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
