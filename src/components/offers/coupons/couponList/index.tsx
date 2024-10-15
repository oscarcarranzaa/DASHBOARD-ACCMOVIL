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
} from '@nextui-org/react'
import { couponsRows } from './rows'
import Link from 'next/link'
import VerifiedSVG from '@/components/icons/verified'
import { useSearchParams } from 'next/navigation'
import { customerSchema, getAllCustomerSchema } from '@/types/customer'
import { couponSchema, listCouponSchema } from '@/types/offers'
import dayjs from 'dayjs'
import CouponState from './couponState'

interface IProps {
  data?: listCouponSchema
  rows: number
  isPending: boolean
}
const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  suspended: 'default',
  disabled: 'danger',
}
export default function CouponList({ data, rows, isPending }: IProps) {
  const [totalPages, setTotalPages] = useState(0)
  const params = useSearchParams()
  const search = params.get('search') || ''

  const getData = data ? data.data : []
  const renderCell = useCallback(
    (coupon: couponSchema, columnKey: React.Key) => {
      switch (columnKey) {
        case 'id':
          return (
            <>
              <p>{coupon.id}</p>
            </>
          )
        case 'code':
          return (
            <>
              <p className=" font-medium">{`${coupon.code}`}</p>
              <p className=" text-xs opacity-70">{`Creado el ${dayjs(coupon.createdAt).format('DD/MM/YYYY')}`}</p>
            </>
          )
        case 'discount':
          return (
            <>
              <p className="text-red-500 font-semibold">
                {coupon.discount}% DTO
              </p>
            </>
          )

        case 'expense':
          return (
            <>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {coupon.minimumExpense?.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                }) || '∞'}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {coupon.maximumExpense?.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                }) || '∞'}
              </p>
            </>
          )
        case 'usage':
          return (
            <>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {coupon.usageLimit || '∞'}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {coupon.userLimit || '∞'}
              </p>
            </>
          )
        case 'state':
          return (
            <>
              <CouponState status={coupon.isActive} id={coupon.id} />
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
          ? `Mostrando ${rows >= data.results ? data.results : rows} de ${data.total} cupones`
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