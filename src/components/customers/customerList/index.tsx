'use client'
import PaginationPage from '@/components/UI/pagination'
import { useCallback, useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  TableColumn,
  ChipProps,
  Chip,
  User,
} from '@heroui/react'
import { userRows } from './rows'
import Link from 'next/link'
import VerifiedSVG from '@/components/icons/verified'
import { useSearchParams } from 'next/navigation'
import { customerSchema, getAllCustomerSchema } from '@/types/customer'
import ErrorsPages from '@/components/errorsPages'
import { useQuery } from '@tanstack/react-query'
import { getAllCustomer } from '@/api/customer'

interface IProps {
  data?: getAllCustomerSchema
  rows: number
  isPending: boolean
}
const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  suspended: 'default',
  disabled: 'danger',
}

const rows = 20
export default function CustomerList() {
  const [totalPages, setTotalPages] = useState(0)
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const { data, isPending, error } = useQuery({
    queryKey: ['customer', currentPage.toString(), search],
    queryFn: () =>
      getAllCustomer(currentPage.toString(), rows.toString(), search),
    refetchOnWindowFocus: false,
    retry: false,
  })

  const getData = data ? data.data : []
  const renderCell = useCallback(
    (customer: customerSchema, columnKey: React.Key) => {
      const image = customer.avatar || '/static/default-profile.png'
      switch (columnKey) {
        case 'name':
          return (
            <Link
              className="hover:underline"
              href={`/dash/clientes/${customer.id}`}
            >
              <User
                avatarProps={{ radius: 'lg', src: image }}
                description={customer.email}
                name={
                  <div className="flex gap-x-2 line-clamp-1">
                    <p>{customer.name}</p>
                    <VerifiedSVG
                      size={18}
                      color={customer.emailVerified ? '#09f' : '#777'}
                    />
                  </div>
                }
              >
                {`${customer.email}`}
              </User>
            </Link>
          )
        case 'email':
          return (
            <>
              <p>{customer.email}</p>

              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {customer.phone || 'N/D'}
              </p>
            </>
          )

        case 'status':
          return (
            <>
              <Chip
                className="capitalize"
                color={statusColorMap[customer.status]}
                size="sm"
                variant="flat"
              >
                {customer.status}
              </Chip>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {customer.gender || 'N/D'}
              </p>
            </>
          )
      }
    },
    []
  )
  useEffect(() => {
    if (data) setTotalPages(data?.totalPages)
  }, [data])

  const emptyData = !data
    ? 'No se encontraron datos...'
    : data.data.length === 0
      ? 'No hay resultados de búsqueda.'
      : 'Algo salió mal :('

  const loadingState = isPending ? 'loading' : 'idle'
  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  return (
    <>
      <p className="text-sm text-zinc-500 ">
        {data?.total
          ? `Mostrando ${rows >= data.results ? data.results : rows} de ${data.total} clientes`
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
        aria-label="Mostrar clientes"
        bottomContent={
          totalPages > 0 && (
            <div className="flex w-full justify-center">
              <PaginationPage totalPages={totalPages} />
            </div>
          )
        }
      >
        <TableHeader>
          {userRows.map((r) => {
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
    </>
  )
}
