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
} from '@heroui/react'
import { userRows } from './rows'
import { UserSchema } from '@/types/users'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getAllUsers } from '@/api/users'
import { useQuery } from '@tanstack/react-query'
import ErrorsPages from '@/components/errorsPages'

const statusColorMap: Record<string, ChipProps['color']> = {
  ACTIVE: 'success',
  INACTIVE: 'default',
  SUSPENDED: 'danger',
  TERMINATED: 'warning',
}
const rows = 20
export default function UserList() {
  const [totalPages, setTotalPages] = useState(0)
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const { data, isPending, error } = useQuery({
    queryKey: ['users', currentPage.toString(), search],
    queryFn: () => getAllUsers(currentPage.toString(), rows.toString(), search),
    refetchOnWindowFocus: false,
    retry: false,
  })

  const getData = data ? data.data : []
  const renderCell = useCallback((user: UserSchema, columnKey: React.Key) => {
    const image = user.avatar || '/static/default-profile.png'

    switch (columnKey) {
      case 'name':
        const name = `${user.firstName.split(' ')[0]} ${user.lastName.split(' ')[0]}`
        return (
          <Link
            className="hover:underline"
            href={`/dash/usuarios/${user.username}`}
          >
            <User
              avatarProps={{ radius: 'lg', src: image }}
              description={user.username}
              name={
                <div className="flex gap-x-2 line-clamp-1">
                  <p>{name}</p>
                </div>
              }
            >
              {`@${user.username}`}
            </User>
          </Link>
        )
      case 'email':
        return user.email
      case 'job':
        return (
          <>
            <p>{user.job}</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs">
              {user.role?.name || 'Administrador'}
            </p>
          </>
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
  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  const loadingState = isPending ? 'loading' : 'idle'
  return (
    <>
      <p className="text-sm text-zinc-500 ">
        {data?.total
          ? `Mostrando ${rows >= data.results ? data.results : rows} de ${data.total} usuarios`
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
              key={item.username}
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
