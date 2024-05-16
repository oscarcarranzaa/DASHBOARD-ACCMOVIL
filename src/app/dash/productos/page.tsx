'use client'

import { getAllProducts } from '@/api/products'
import DisplayPrice from '@/components/displayPrice'
import ClockSVG from '@/components/icons/clock'
import MenuDotsSVG from '@/components/icons/menuDots'
import NavegationPages from '@/components/navegationPages'
import SquareImage from '@/components/squareImage'
import { getProductImageSchema } from '@/types/poducts'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback } from 'react'

export default function Dash() {
  const { data, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts('1', '20'),
    refetchOnWindowFocus: false,
  })
  const rows = [{}]
  const getData = data ? data.data : []
  const renderCell = (user: getProductImageSchema, columnKey: React.Key) => {
    const cellValue = user[columnKey]
    const image = user.image?.images
      ? user.image.images[0].src
      : '/static/product.webp'
    switch (columnKey) {
      case 'image':
        return (
          <div className="w-14">
            <SquareImage src={image} />
          </div>
        )
      case 'price':
        return (
          <DisplayPrice
            price={user.price}
            discountPrice={user.priceDiscount?.price}
            startDate={user.priceDiscount?.start}
            endDate={user.priceDiscount?.end}
          />
        )
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            ...
          </div>
        )
      default:
        return cellValue
    }
  }
  return (
    <>
      <NavegationPages text="Ver productos" />
      <Table isHeaderSticky selectionMode="single">
        <TableHeader>
          <TableColumn key={'image'}>Imagen</TableColumn>
          <TableColumn key={'name'}>Nombre</TableColumn>
          <TableColumn key={'code'}>Código </TableColumn>
          <TableColumn key={'stock'}>Cantidad</TableColumn>
          <TableColumn key={'price'}>Precio</TableColumn>
          <TableColumn key={'actions'}>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={'No se encontraron datos :('}
          items={getData}
          isLoading={isPending}
          loadingContent={<Spinner label="Cargando..." />}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell align="center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
