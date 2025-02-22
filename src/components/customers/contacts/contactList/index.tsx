'use client'

import PaginationPage from '@/components/UI/pagination'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
} from "@heroui/react"
import { contactRows } from './rows'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { contactSchema, getAllContactSchema } from '@/types/customer'
import formaFromNowDate from '@/utils/formatFromNowDate'
import EmailSVG from '@/components/icons/email'
import PhoneSVG from '@/components/icons/phone'

interface IProps {
  data?: getAllContactSchema
  rows: number
  isPending: boolean
}
const statusColorMap: Record<string, ChipProps['color']> = {
  SUBSCRIBED: 'success',
  UNSUBSCRIBED: 'warning',
  BOUNCED: 'danger',
}
const statusContactMap = {
  SUBSCRIBED: 'SUBSCRITO',
  UNSUBSCRIBED: 'DE BAJA',
  BOUNCED: 'REBOTADO',
}
export default function ContactList({ data, rows, isPending }: IProps) {
  const [totalPages, setTotalPages] = useState(0)
  const params = useSearchParams()
  const search = params.get('search') || ''

  const getData = data ? data.data : []
  const renderCell = useCallback(
    (contact: contactSchema, columnKey: React.Key) => {
      switch (columnKey) {
        case 'name':
          const name = `${contact.firstName?.split(' ')[0]} ${contact.lastName?.split(' ')[0] ?? ''}`
          return (
            <Link
              className="hover:underline flex"
              href={`/dash/pipe/contactos/${contact.id}`}
            >
              <User
                avatarProps={{
                  radius: 'full',
                  src: contact.avatar ?? undefined,
                  name: contact.firstName.toUpperCase(),
                  className: 'bg-blue-200 dark:bg-blue-700',
                }}
                description={`Se unió ${formaFromNowDate(contact.createdAt)}`}
                name={
                  <div className="flex gap-x-2 line-clamp-1">
                    <p>{name}</p>
                  </div>
                }
              ></User>
            </Link>
          )
        case 'email':
          return (
            <>
              <div className="flex gap-x-2 gap-y-1">
                <div className="dark:stroke-white">
                  <EmailSVG size={18} />
                </div>
                <p>{contact.email || 'N/D'}</p>
              </div>
              <div className="flex gap-x-2">
                <div className="dark:stroke-white">
                  <PhoneSVG size={18} />
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                  {contact.phone || 'N/D'}
                </p>
              </div>
            </>
          )

        case 'status':
          return (
            <>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[contact.status]}
                size="sm"
                variant="dot"
              >
                {statusContactMap[contact.status]}
              </Chip>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {contact.address || 'N/D'}
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
  const classNames = useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]/tr:first:before:rounded-none',
        'group-data-[first=true]/tr:last:before:rounded-none',
        // middle
        'group-data-[middle=true]/tr:before:rounded-none',
        // last
        'group-data-[last=true]/tr:first:before:rounded-none',
        'group-data-[last=true]/tr:last:before:rounded-none',
      ],
    }),
    []
  )
  return (
    <>
      <p className="text-sm text-zinc-500 ">
        {data?.total
          ? `Mostrando ${rows >= data.results ? data.results : rows} de ${data.total} contactos`
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
        removeWrapper
        isCompact
        classNames={classNames}
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
          {contactRows.map((r) => {
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
