'use client'
import { getAllProducts } from '@/api/products'
import DisplayPrice from '@/components/displayPrice'
import MenuDotsSVG from '@/components/icons/menuDots'
import PlusSVG from '@/components/icons/plus'
import SearchSVG from '@/components/icons/search'
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Input,
  Button,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function Dash() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const rows = '20'
  const { data, isPending } = useQuery({
    queryKey: ['products', page, search],
    queryFn: () => getAllProducts(page.toString(), rows, search),
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    if (data) setTotalPages(data?.totalPages)
  }, [data])
  const debounce = useDebouncedCallback((value: string) => {
    if (value.length > 2) {
      setSearch(value)
      setPage(1)
    }
  }, 1000)

  const getData = data ? data.data : []
  const renderCell = useCallback(
    (user: getProductImageSchema, columnKey: React.Key) => {
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
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <MenuDotsSVG size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Example with disabled actions">
                  <DropdownItem key="new">
                    <Button as={Link} href={`/dash/productos/${user._id}`}>
                      Ver producto
                    </Button>
                  </DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return cellValue
      }
    },
    []
  )
  const loadingState = isPending ? 'loading' : 'idle'
  return (
    <>
      <NavegationPages text="Ver productos" />
      <div className="dark:fill-white flex justify-between items-center mb-3">
        <Input
          className="w-full sm:max-w-[35%]"
          size="lg"
          onChange={(e) => debounce(e.target.value)}
          startContent={<SearchSVG size={24} />}
          placeholder="Buscar producto..."
          isClearable
          onClear={() => setSearch('')}
          variant="bordered"
        />
        <Button
          color="primary"
          className="fill-white"
          as={Link}
          href="/dash/productos/nuevo"
        >
          Agregar Nuevo <PlusSVG size={20} />
        </Button>
      </div>
      <p className="text-sm text-zinc-500 ">
        {data?.totalProducts
          ? `Mostrando ${rows} de ${data.totalProducts} productos`
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
              <Pagination
                onChange={(n) => setPage(n)}
                showControls
                variant="bordered"
                total={totalPages}
                page={page}
                initialPage={page}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn key={'image'}>Imagen</TableColumn>
          <TableColumn key={'name'}>Nombre</TableColumn>
          <TableColumn key={'code'}>Código </TableColumn>
          <TableColumn key={'stock'}>Cantidad</TableColumn>
          <TableColumn key={'price'}>Precio</TableColumn>
          <TableColumn key={'actions'}>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            !data
              ? 'No se encontraron datos...'
              : data.data.length === 0
                ? 'No hay resultados de búsqueda.'
                : 'Algo salió mal :('
          }
          items={getData}
          loadingContent={<Spinner label="Cargando..." />}
          loadingState={loadingState}
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
