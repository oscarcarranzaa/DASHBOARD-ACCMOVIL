'use client'

import PaginationPage from '@/components/UI/pagination'
import { AllUsersSchema } from '@/types/users'
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
} from '@nextui-org/react'
import { userRows } from './rows'
import { UserSchema } from '@/types/users'
import Link from 'next/link'
import VerifiedSVG from '@/components/icons/verified'
import { useSearchParams } from 'next/navigation'

interface IProps {
  data?: AllUsersSchema
  rows: number
  isPending: boolean
}
const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  suspended: 'danger',
  disabled: 'warning',
}
export default function UserList({ data, rows, isPending }: IProps) {
  const [totalPages, setTotalPages] = useState(0)
  const params = useSearchParams()
  const search = params.get('search') || ''

  const getData = data ? data.data : []
  const renderCell = useCallback((user: UserSchema, columnKey: React.Key) => {
    const image = user.avatar?.images
      ? user.avatar.images[0].src
      : '/static/default-profile.png'

    switch (columnKey) {
      case 'name':
        const verifiedColor = user.verify ? '#09f' : '#777'
        return (
          <Link className="hover:underline" href={`/dash/clientes/${user._id}`}>
            <User
              avatarProps={{ radius: 'lg', src: image }}
              description={user.email}
              name={
                <div className="flex gap-x-2">
                  <p>{user.name}</p>{' '}
                  <VerifiedSVG size={18} color={verifiedColor} />
                </div>
              }
            >
              {user.email}
            </User>
          </Link>
        )
      case 'phone':
        return user.phone || '-'
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {user.status}
          </Chip>
        )
    }
  }, [])
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
          ? `Mostrando ${rows >= data.total ? data.total : rows} de ${data.total} clientes`
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
