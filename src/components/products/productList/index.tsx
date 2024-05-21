'use client'
import DropDown from '@/components/UI/dropDown/dropDown'
import PaginationPage from '@/components/UI/pagination'
import DisplayPrice from '@/components/displayPrice'
import Edit from '@/components/icons/edit'
import OpenSVG from '@/components/icons/open'
import TrashSVG from '@/components/icons/trahs'
import SquareImage from '@/components/squareImage'
import { getProductImageSchema, getProductSchema } from '@/types/poducts'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { ProductsRows } from './rows'
import { useSearchParams } from 'next/navigation'

interface IProps {
  data?: getProductSchema
  rows: number
  isPending: boolean
}

export default function ProductList({ data, rows, isPending }: IProps) {
  const [totalPages, setTotalPages] = useState(0)
  const params = useSearchParams()
  const search = params.get('search') || ''

  useEffect(() => {
    if (data) setTotalPages(data?.totalPages)
  }, [data])

  const getData = data ? data.data : []

  const renderCell = useCallback(
    (user: getProductImageSchema, columnKey: React.Key) => {
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
        case 'name':
          return (
            <Link
              className="hover:underline"
              href={`/dash/productos/${user._id}`}
            >
              {user.name}
            </Link>
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
            <div className="relative flex justify-end items-center gap-2 stroke-white">
              <DropDown label="Acciones">
                <Link
                  href={`/dash/productos/${user._id}`}
                  className="flex p-2 items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full rounded-md"
                >
                  <OpenSVG size={20} />
                  <p className="ml-2">Abrir</p>
                </Link>
                <Link
                  href={`/dash/productos/${user._id}/editar`}
                  className="flex p-2 items-center dark:hover:bg-gray-700 hover:bg-gray-200 w-full rounded-md"
                >
                  <Edit size={20} />
                  <p className="ml-2">Editar</p>
                </Link>
                <button className=" stroke-red-500 flex items-center  text-red-500 w-full p-2 rounded-md hover:bg-red-500 hover:text-white hover:stroke-white disabled:cursor-not-allowed disabled:bg-red-700">
                  <TrashSVG size={20} />
                  <p className="ml-2">Mover a papelera</p>
                </button>
              </DropDown>
            </div>
          )
        case 'stock':
          return user.stock
        case 'code':
          return user.code
      }
    },
    []
  )
  const emptyData = !data
    ? 'No se encontraron datos...'
    : data.data.length === 0
      ? 'No hay resultados de búsqueda.'
      : 'Algo salió mal :('
  const loadingState = isPending ? 'loading' : 'idle'

  return (
    <>
      <p className="text-sm text-zinc-500 ">
        {data?.totalProducts
          ? `Mostrando ${rows >= data.totalProducts ? data.totalProducts : rows} de ${data.totalProducts} productos`
          : ''}
        {isPending && 'Cargando...'}
        {!isPending && data?.data.length === 0 && search ? (
          <>
            No se encontraron resultados de <b>{search}</b>
          </>
        ) : (
          ''
        )}
      </p>
      <Table
        isHeaderSticky
        removeWrapper
        aria-label="Mostrar los productos"
        bottomContent={
          totalPages > 0 && (
            <div className="flex w-full justify-center">
              <PaginationPage totalPages={totalPages} />
            </div>
          )
        }
      >
        <TableHeader>
          {ProductsRows.map((r) => {
            return <TableColumn key={r.key}>{r.name}</TableColumn>
          })}
        </TableHeader>
        <TableBody
          emptyContent={emptyData}
          items={getData}
          loadingState={loadingState}
          loadingContent={<Spinner label="Cargando..." />}
        >
          {(item) => (
            <TableRow
              key={item._id}
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
    </>
  )
}
