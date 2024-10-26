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
  Avatar,
  AvatarGroup,
  Badge,
} from '@nextui-org/react'
import { orderRows } from './rows'
import VerifiedSVG from '@/components/icons/verified'
import { useSearchParams } from 'next/navigation'
import { customerSchema, getAllCustomerSchema } from '@/types/customer'
import { orderCellSchema, orderListSchema } from '@/types/order'
import { CustomerProfileSVG } from '@/components/icons/customerProfile'
import dayjs from 'dayjs'
import formaFromNowDate from '@/utils/formatFromNowDate'
import Link from 'next/link'

interface IProps {
  data?: orderListSchema
  rows: number
  isPending: boolean
}
const statusColorMap: Record<string, ChipProps['color']> = {
  completed: 'success',
  cancelled: 'default',
  processing: 'primary',
  pending: 'warning',
  refund: 'danger',
}
const orderStatus: Record<string, string> = {
  completed: 'Completado',
  cancelled: 'Cancelado',
  processing: 'Procesando',
  pending: 'Pendiente',
  refund: 'Reembolsado',
}
const paidStatus: Record<string, string> = {
  PENDING: 'Pendiente pago',
  COMPLETED: 'Pagado',
  FAILED: 'Pago fallido',
  CANCELLED: 'Pago cancelado',
}
export default function OrderList({ data, rows, isPending }: IProps) {
  const [totalPages, setTotalPages] = useState(0)
  const params = useSearchParams()
  const search = params.get('search') || ''

  const getData = data ? data.data : []

  const renderCell = useCallback(
    (order: orderCellSchema, columnKey: React.Key) => {
      switch (columnKey) {
        case 'order':
          return (
            <Link className=" hover:underline" href={`pedidos/${order.id}`}>
              #{order.orderId}
            </Link>
          )
        case 'customer':
          return (
            <div className=" flex items-center">
              <Avatar
                src={order?.customer?.avatar ?? undefined}
                icon={<CustomerProfileSVG size={50} />}
                showFallback
              />
              <div className=" ml-2">
                <p className="font-medium">
                  {order.billingInfo?.firstName} {order.billingInfo?.lastName}{' '}
                  {!order.customer && '(Invitado)'}
                </p>
                <p className=" text-sm opacity-70">
                  {order.billingInfo?.email}
                </p>
              </div>
            </div>
          )
        case 'status':
          return (
            <Link href={`pedidos/${order.id}`}>
              <Chip
                className="capitalize"
                color={statusColorMap[order.status]}
                variant="dot"
              >
                {orderStatus[order.status]}
              </Chip>
            </Link>
          )
        case 'transaction':
          const isPaid =
            order.transaction?.paymentStatus === 'COMPLETED'
              ? 'text-success'
              : 'text-warning'
          return (
            <div>
              <div className={`${isPaid} font-bold text-lg"`}>
                {order.totalAmount.toLocaleString('es-HN', {
                  style: 'currency',
                  currency: 'HNL',
                })}
              </div>
              <p className=" text-xs opacity-60">
                {order.transaction
                  ? paidStatus[order.transaction.paymentStatus]
                  : 'Esperando transacción'}
              </p>
            </div>
          )
        case 'products':
          return (
            <div>
              <AvatarGroup max={3}>
                {order.orderItems.map((product) => {
                  const img = product.product.media?.qualities
                    ? product.product.media.qualities[0].src
                    : '/static/product.webp'
                  return (
                    <Badge
                      content={product.quantity}
                      color="danger"
                      placement="top-left"
                      size="sm"
                      key={product.id}
                    >
                      <Avatar src={img}></Avatar>
                    </Badge>
                  )
                })}
              </AvatarGroup>
            </div>
          )
        case 'date':
          return <p>{formaFromNowDate(order.completedAt)}</p>
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
      ? 'No se encontrarón resultados :('
      : 'Algo salió mal :('

  const loadingState = isPending ? 'loading' : 'idle'
  return (
    <>
      <p className="text-sm text-zinc-500 ">
        {data?.total
          ? `Mostrando ${rows >= data.results ? data.results : rows} de ${data.total} ordenes`
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
        aria-label="Mostrar ordenes"
        bottomContent={
          totalPages > 0 && (
            <div className="flex w-full justify-center">
              <PaginationPage totalPages={totalPages} />
            </div>
          )
        }
      >
        <TableHeader>
          {orderRows.map((r) => {
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
    </>
  )
}
