import PaginationPage from '@/components/UI/pagination'
import { couponSchema } from '@/types/offers'
import { orderInfoSchema, orderItemsSchema } from '@/types/order'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Avatar,
} from '@nextui-org/react'
import { productsOrderRows } from './rows'
import { useCallback } from 'react'

type TProps = {
  orderItems: orderItemsSchema[]
  coupon?: couponSchema | null
  order: orderInfoSchema
}

export default function OrderProductsResume({
  orderItems,
  order,
  coupon,
}: TProps) {
  const renderCell = useCallback(
    (order: orderItemsSchema, columnKey: React.Key) => {
      switch (columnKey) {
        case 'product':
          const image =
            order.product.media?.qualities[0].src ?? '/static/product.webp'
          return (
            <div className=" flex items-center">
              <Avatar src={image} showFallback radius="sm" />
              <div className=" ml-2">
                <p className="font-medium">{order.product.name}</p>
              </div>
            </div>
          )
        case 'sku':
          return <p>{order.product.sku}</p>
        case 'price':
          return (
            <div>
              <div className={` font-bold text-lg"`}>
                {order.discountPrice && (
                  <p className=" text-red-500">
                    {order.discountPrice?.toLocaleString('es-HN', {
                      style: 'currency',
                      currency: 'HNL',
                    })}
                  </p>
                )}
              </div>
              <p className={order.discountPrice ? ' line-through text-xs' : ''}>
                {order.price?.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </p>
            </div>
          )

        case 'quantity':
          return <p>*{order.quantity}</p>
      }
    },
    []
  )
  const orderAmount = {
    subTotal: order?.subTotal ?? 0,
    totalAmount: order?.totalAmount ?? 0,
    discountTotal: order?.discountTotal ? -order.discountTotal : 0,
    couponDiscount: order?.couponDiscount ? -order.couponDiscount : 0,
    shippingCost: order?.shippingCost ?? 0,
  }
  const { subTotal, totalAmount, discountTotal, couponDiscount, shippingCost } =
    orderAmount

  return (
    <>
      <div>
        <div>
          <p className=" font-semibold text-lg">Resumen del pedido </p>
        </div>
        <div>
          <Table isHeaderSticky aria-label="Mostrar ordenes">
            <TableHeader>
              {productsOrderRows.map((r) => {
                return <TableColumn key={r.key}>{r.name}</TableColumn>
              })}
            </TableHeader>
            <TableBody
              emptyContent={'No hay datos...'}
              items={orderItems}
              loadingContent={<Spinner label="Cargando..." />}
            >
              {(item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-800 py-1"
                >
                  {(columnKey) => (
                    <TableCell align="center">
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="grid grid-cols-2 mt-3">
          <div></div>
          <div>
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
                  {shippingCost?.toLocaleString('es-HN', {
                    style: 'currency',
                    currency: 'HNL',
                  })}
                </p>
              </li>
              {coupon && (
                <li className=" flex justify-between text-sm">
                  <p>Cupón aplicado:</p>
                  <p>
                    {couponDiscount?.toLocaleString('es-HN', {
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
      </div>
    </>
  )
}
