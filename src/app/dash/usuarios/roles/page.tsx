'use client'
import Link from 'next/link'
import { getAllRoles } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import RoleList from '@/components/users/roles/roleItems'
import { Alert, Button } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import ErrorsPages from '@/components/errorsPages'
import { ShieldPlus } from 'lucide-react'
import Image from 'next/image'

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
        <NavegationPages text="Roles y permisos de usuarios" />
      </div>
      <div className="flex justify-between items-center dark:bg-zinc-900 bg-zinc-200 rounded-lg p-2 px-4">
        <div>
          <p className="text-lg font-semibold">
            Administra los roles de acceso para tus usuarios
          </p>
        </div>
        <Button
          href="/dash/usuarios/roles/nuevo"
          as={Link}
          color="primary"
          startContent={<ShieldPlus size={18} />}
        >
          Nuevo grupo
        </Button>
      </div>

      <div className="mt-5">
        <Alert variant="flat" color="success">
          Los conjuntos de permisos definen lo que pueden hacer y ver los
          diferentes tipos de usuarios. Cada aplicación tiene sus propios
          conjuntos para controlar el acceso a esa aplicación.
        </Alert>
      </div>
      {data && (
        <div className="mt-10">
          {data.length === 0 ? (
            <div className="flex flex-col  justify-center items-center">
              <Image
                src="/static/shield-user.webp"
                alt="empty"
                width={350}
                height={350}
              />
              <p className="text-base mt-10 text-center">
                Aún no tienes roles, Comienza creando un nuevo grupo de roles
                para tus usuarios.
              </p>
              <Button
                href="/dash/usuarios/roles/nuevo"
                as={Link}
                size="lg"
                className="mt-5"
                color="primary"
                startContent={<ShieldPlus size={18} />}
              >
                Nuevo grupo
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </>
  )
}
