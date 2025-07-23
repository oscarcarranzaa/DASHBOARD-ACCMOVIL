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
  Button,
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import { userRows } from './rows'
import { UserOwnerSchema } from '@/types/users'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getAllUsers } from '@/api/users'
import { useQuery } from '@tanstack/react-query'
import ErrorsPages from '@/components/errorsPages'
import {
  Bolt,
  CircleOff,
  Ellipsis,
  Key,
  Pencil,
  UserRoundCheck,
} from 'lucide-react'
import formaFromNowDate from '@/utils/formatFromNowDate'
import { useAuthStore } from '@/store/auth'
import DisableUser from '../disable'
import ActiveUser from '../active'

const statusColorMap: Record<string, ChipProps['color']> = {
  ACTIVE: 'success',
  INACTIVE: 'default',
  TERMINATED: 'warning',
}
const statusName: Record<string, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  TERMINATED: 'Terminado',
}
const rows = 20
type TProps = {
  status?: string
}
export default function UserList({ status }: TProps) {
  const [totalPages, setTotalPages] = useState(0)
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''
  const thisUser = useAuthStore((state) => state.user)?.id

  const { data, isPending, error } = useQuery({
    queryKey: ['users', currentPage.toString(), search, status],
    queryFn: () =>
      getAllUsers(currentPage.toString(), rows.toString(), search, status),
    refetchOnWindowFocus: false,
    retry: false,
  })

  const getData = data ? data.data : []
  const renderCell = useCallback(
    (user: UserOwnerSchema, columnKey: React.Key) => {
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
                    <p>{`${name} ${user.id === thisUser ? '(Tú)' : ''}`}</p>
                  </div>
                }
              >
                {`@${user.username}`}
              </User>
            </Link>
          )
        case 'contact':
          return (
            <>
              <p>{user.email}</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {user.phone || 'Tel: -'}
              </p>
            </>
          )
        case 'admin':
          return (
            <Tooltip
              placement="bottom"
              offset={20}
              className="max-w-[250px]"
              content="El usuario tiene acceso a las funciones configuradas a nivel de cuenta para la empresa (centro de seguridad, analisis general, administración de usuarios)."
            >
              <Chip
                className="capitalize"
                size="sm"
                variant="flat"
                color={user.is_owner ? 'success' : 'default'}
              >
                <Key size={18} />
              </Chip>
            </Tooltip>
          )
        case 'lastLogin':
          return (
            <>
              <p className="text-xs">
                {user.lastLogin ? formaFromNowDate(user.lastLogin) : 'Nunca'}
              </p>
            </>
          )

        case 'job':
          return (
            <>
              <p>{user.job}</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {user.role?.name || 'Administrador'}
              </p>
            </>
          )
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {statusName[user.status]}
            </Chip>
          )
        case 'actions':
          return (
            <div className="flex gap-2">
              <Dropdown shouldBlockScroll={false}>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="flat"
                    color="default"
                    className="w-8 h-8"
                    size="sm"
                  >
                    <Ellipsis size={12} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu closeOnSelect={false} variant="faded">
                  <DropdownItem
                    key="edit"
                    description="Editar  usuario"
                    startContent={<Pencil size={18} />}
                  >
                    Editar
                  </DropdownItem>
                  {user.id !== thisUser && user.status === 'ACTIVE' ? (
                    <DropdownItem
                      key="delete"
                      className="text-danger p-0 "
                      color="danger"
                    >
                      <DisableUser
                        user={user}
                        buttonProps={{
                          className: 'w-full py-6',
                          variant: 'flat',
                          color: 'danger',
                          radius: 'sm',
                          startContent: <CircleOff size={18} />,
                        }}
                        button={
                          <div className="flex flex-col text-start">
                            <p>Desactivar</p>
                            <p className="text-xs">
                              Ya no podrá iniciar sesión
                            </p>
                          </div>
                        }
                      />
                    </DropdownItem>
                  ) : null}
                  {user.id !== thisUser && user.status === 'INACTIVE' ? (
                    <DropdownItem
                      key="delete"
                      className="text-danger p-0 "
                      color="danger"
                    >
                      <ActiveUser
                        user={user}
                        buttonProps={{
                          className: 'w-full py-6',
                          variant: 'flat',
                          color: 'success',
                          radius: 'sm',
                          startContent: <UserRoundCheck size={18} />,
                        }}
                        button={
                          <div className="flex flex-col text-start">
                            <p>Reactivar</p>
                            <p className="text-xs">Reactiva a este usuario.</p>
                          </div>
                        }
                      />
                    </DropdownItem>
                  ) : null}
                </DropdownMenu>
              </Dropdown>
            </div>
          )
      }
    },
    [thisUser]
  )
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
