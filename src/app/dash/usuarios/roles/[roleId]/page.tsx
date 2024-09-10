'use client'
import { getOneRol } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import RoleEditor from '@/components/users/roles/roleEditor'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function AdminRolPage() {
  const params = useParams()
  const ID = params.roleId
  const { data } = useQuery({
    queryKey: ['role', ID],
    queryFn: () => getOneRol(ID.toString()),
    refetchOnWindowFocus: false,
  })
  return (
    <>
      <NavegationPages text={data?.name ?? 'Cargando...'} />
      <div className="w-full">{data && <RoleEditor data={data} />}</div>
    </>
  )
}
