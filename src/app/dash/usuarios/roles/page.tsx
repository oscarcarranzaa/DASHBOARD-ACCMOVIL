'use client'

import { getAllRoles } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import RoleList from '@/components/users/roles/roleItems'
import { useQuery } from '@tanstack/react-query'

export default function UserRoles() {
  const { data, isPending } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <NavegationPages text="Roles de usuarios" />
      <p className="mb-5">
        Mostrando los roles de acceso para tus usuarios creados...
      </p>
      <div className=" grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 w-full flex-wrap select-none">
        {data &&
          data.map((rol) => (
            <RoleList
              key={rol.id}
              id={rol.id}
              name={rol.name}
              users={rol.user?.length ?? 0}
            />
          ))}
      </div>
    </>
  )
}
