'use client'

import { getAllProducts } from '@/api/products'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'

export default function Dash() {
  const { data, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts('10', '20'),
    refetchOnWindowFocus: false,
  })
  console.log(data, isPending)
  const columns = [
    {
      key: 'name',
      label: 'NOMBRE',
    },
    {
      key: 'role',
      label: 'ROLE',
    },
    {
      key: 'status',
      label: 'STATUS',
    },
  ]
  const getData = data ? data.data : []
  return (
    <>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn key={'name'}>Imagen</TableColumn>
          <TableColumn key={'name'}>Nombre</TableColumn>
          <TableColumn key={'code'}>Código </TableColumn>
          <TableColumn key={'stock'}>Cantidad</TableColumn>
          <TableColumn key={'price'}>Precio</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={'No se encontraron datos :('}
          items={getData}
          isLoading={isPending}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
