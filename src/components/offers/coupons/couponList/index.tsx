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
  Switch,
} from '@heroui/react'
import { couponsRows } from './rows'
import Link from 'next/link'
import VerifiedSVG from '@/components/icons/verified'
import { useSearchParams } from 'next/navigation'
import { customerSchema, getAllCustomerSchema } from '@/types/customer'
import { couponSchema, listCouponSchema } from '@/types/offers'
import dayjs from 'dayjs'
import CouponState from './couponState'
import { useQuery } from '@tanstack/react-query'
import { getAllCoupons } from '@/api/offerts'

const ROWS = 10
export default function CouponList() {
  const [totalPages, setTotalPages] = useState(0)
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''
  const { data, isPending } = useQuery({
    queryKey: ['coupons', currentPage, search],
    queryFn: () =>
      getAllCoupons({
        page: currentPage.toString(),
        limit: ROWS.toString(),
        q: search,
      }),
  })

  const getData = data ? data.data : []
  const renderCell = useCallback(
    (coupon: couponSchema, columnKey: React.Key) => {
      const {
        id,
        code,
        discount,
        minimumExpense,
        maximumExpense,
        expiresAt,
        usageLimit,
        isActive,
        userLimit,
        createdAt,
      } = coupon
      const minExp = minimumExpense?.toLocaleString('es-HN', {
        style: 'currency',
        currency: 'HNL',
      })
      const maxExp = maximumExpense?.toLocaleString('es-HN', {
        style: 'currency',
        currency: 'HNL',
      })
      switch (columnKey) {
        case 'id':
          return (
            <>
              <p>{id}</p>
            </>
          )
        case 'code':
          return (
            <>
              <p className=" font-medium">{`${code}`}</p>
              <p className=" text-xs opacity-60">{`Creado el ${dayjs(createdAt).format('DD/MM/YYYY')}`}</p>
            </>
          )
        case 'discount':
          return (
            <>
              <p className="text-red-500 font-semibold">{discount}% DTO</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {expiresAt
                  ? `Vence el ${dayjs(expiresAt).format('DD/MM/YYYY')}`
                  : 'Sin límite de vencimiento'}
              </p>
            </>
          )

        case 'expense':
          return (
            <>
              <p>{minimumExpense ? minExp : 'N/D'}</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {maximumExpense ? maxExp : 'N/D'}
              </p>
            </>
          )
        case 'usage':
          return (
            <>
              <p className="  ">{usageLimit || 'Ilimitado'}</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {userLimit || 'Ilimitado'}
              </p>
            </>
          )
        case 'state':
          return (
            <>
              <CouponState status={isActive} id={id} />
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
  return (
    <>
      <p className="text-sm text-zinc-500 ">
        {data?.total
          ? `Mostrando ${ROWS >= data.results ? data.results : ROWS} de ${data.total} cupones`
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
        aria-label="Mostrar cupones"
        bottomContent={
          totalPages > 0 && (
            <div className="flex w-full justify-center">
              <PaginationPage totalPages={totalPages} />
            </div>
          )
        }
      >
        <TableHeader>
          {couponsRows.map((r) => {
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
