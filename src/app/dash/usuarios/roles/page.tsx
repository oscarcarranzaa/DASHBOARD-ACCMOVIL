'use client'
import Link from 'next/link'
import { getAllRoles } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import RoleList from '@/components/users/roles/roleItems'
import { Button } from '@nextui-org/button'
import { useQuery } from '@tanstack/react-query'
import ErrorsPages from '@/components/errorsPages'

export default function UserRoles() {
  const { data, isPending, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
    retry: false,
    refetchOnWindowFocus: false,
  })
  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  return (
    <>
      <div className="flex justify-between">
        <NavegationPages
          text={data ? 'Roles de usuarios' : 'Cargando recursos...'}
        />
        {data && (
          <Button href="/dash/usuarios/roles/nuevo" as={Link} color="primary">
            Crear nuevo
          </Button>
        )}
      </div>
      {data && (
        <div>
          <p className="mb-5">
            Mostrando los roles de acceso para tus usuarios creados...
          </p>

          <div className=" grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 w-full flex-wrap select-none">
            {data.map((rol) => (
              <RoleList
                key={rol.id}
                id={rol.id}
                name={rol.name}
                users={rol.user?.length ?? 0}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
