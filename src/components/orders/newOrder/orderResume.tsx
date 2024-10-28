'use client'

import DisplayPrice from '@/components/displayPrice'
import { createOrderState } from '@/store/order'
import { Avatar, Badge, Spinner } from '@nextui-org/react'
import RendeemCoupon from '../coupon/rendeemCoupon'

export default function OrderResume() {
  const orderProducts = createOrderState((state) => state.products)
  const completedNavegation = createOrderState(
    (state) => state.completedNavegation
  )
  const orderInfo = createOrderState((state) => state.orderInfo)
  const coupon = createOrderState((state) => state.coupon)

  const isCompletedContact = completedNavegation.find((n) => n === 'contact')

  const orderAmount = {
    subTotal: orderInfo?.totalAmount ?? 0,
    totalAmount: orderInfo?.totalAmount ?? 0,
    discountTotal: orderInfo?.discountTotal ? -orderInfo.discountTotal : 0,
    couponDiscount: orderInfo?.couponDiscount ? -orderInfo.couponDiscount : 0,
    shippingCost: orderInfo?.shippingCost ?? 0,
  }
  const { subTotal, totalAmount, discountTotal, couponDiscount, shippingCost } =
    orderAmount

  return (
    <>
      <div className=" bg-white border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 rounded-lg">
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
                  <li key={p.id} className=" relative">
                    <div
                      className={` flex p-2${p.isSaved ? '' : ' select-none opacity-30 hover:cursor-not-allowed'}`}
                    >
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
                      {!p.isSaved && (
                        <div className=" absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                          <Spinner />
                        </div>
                      )}
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
            {orderProducts.length > 0 && isCompletedContact && (
              <div className="py-5">
                <RendeemCoupon />
              </div>
            )}
          </div>
          <ul className=" px-2 pb-5">
            <li className="mt-2 flex justify-between text-sm">
              <p>Subtotal:</p>
              <p>
                {subTotal.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </p>
            </li>
            <li className="flex justify-between text-sm">
              <p>Costo de envío:</p>
              <p>
                {shippingCost.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </p>
            </li>
            {coupon && (
              <li className=" flex justify-between text-sm">
                <p>Cupón aplicado:</p>
                <p>
                  {couponDiscount.toLocaleString('es-HN', {
                    style: 'currency',
                    currency: 'HNL',
                  })}
                </p>
              </li>
            )}
            {discountTotal < 0 && (
              <li className=" flex justify-between  text-red-500 font-semibold ">
                <p>Descuento total:</p>
                <p>
                  {discountTotal.toLocaleString('es-HN', {
                    style: 'currency',
                    currency: 'HNL',
                  })}
                </p>
              </li>
            )}
            <li className=" flex justify-between font-bold mt-2 text-xl">
              <p>Total:</p>
              <p>
                {totalAmount.toLocaleString('es-HN', {
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
