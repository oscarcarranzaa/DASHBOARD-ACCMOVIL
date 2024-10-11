'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react'
import { productOrderList } from './rows'
import { createOrderState } from '@/store/order'
import { useCallback } from 'react'
import SquareImage from '@/components/squareImage'
import DisplayPrice from '@/components/displayPrice'
import { MediaSchema } from '@/types/schemas'
import QuantityCounter from './quantityCounter'
import TrashSVG from '@/components/icons/trahs'

type TProps = {
  id: string
  name: string
  media?: MediaSchema | null
  price: number
  quantity: number
  stock: number
  discountPrice?: number | null
  startDiscount?: string | null
  endDiscount?: string | null
}
export default function ProductItems() {
  const orderProducts = createOrderState((state) => state.products)
  const deletedProduct = createOrderState((state) => state.deletedProduct)
  const renderCell = useCallback(
    (orderProduct: TProps, columnKey: React.Key) => {
      const image = orderProduct.media
        ? orderProduct.media.qualities[2].src
        : '/static/product.webp'
      switch (columnKey) {
        case 'products':
          return (
            <div className=" flex items-center">
              <div className="w-20 h-20 flex-none">
                <SquareImage src={image} />
              </div>
              <p className="ml-2">{orderProduct.name}</p>
            </div>
          )
        case 'quantity':
          return (
            <QuantityCounter
              quantity={orderProduct.quantity}
              id={orderProduct.id}
              stock={orderProduct.stock}
            />
          )

        case 'price':
          return (
            <div className="flex justify-between">
              <DisplayPrice
                price={orderProduct.price}
                discountPrice={orderProduct.discountPrice}
                startDate={orderProduct.startDiscount}
                endDate={orderProduct.endDiscount}
              />
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                className="w-10 h-10"
                onClick={() => deletedProduct(orderProduct.id)}
              >
                <span className="dark:stroke-white stroke-black">
                  <TrashSVG size={16} />
                </span>
              </Button>
            </div>
          )
      }
    },
    []
  )
  return (
    <>
      <div>
        <Table isHeaderSticky removeWrapper aria-label="Mostrar Productos">
          <TableHeader>
            {productOrderList.map((r) => {
              return <TableColumn key={r.key}>{r.name}</TableColumn>
            })}
          </TableHeader>
          <TableBody items={orderProducts}>
            {(item) => (
              <TableRow
                key={item.id}
                className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
    </>
  )
}
