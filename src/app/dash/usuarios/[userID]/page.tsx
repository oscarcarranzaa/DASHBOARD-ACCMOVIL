'use client'
import { getOneUser } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import UserDetails from '@/components/users/userDetails'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function ClientSee() {
  const params = useParams()
  const ID = params.userID
  const { data, isPending } = useQuery({
    queryKey: ['user', ID],
    queryFn: () => getOneUser(ID.toString()),
    refetchOnWindowFocus: false,
  })
  const name = data && `${data?.firstName} ${data?.lastName}`
  return (
    <>
      <NavegationPages text={name ?? 'Cargando usuario...  '} />

      <div>{data && <UserDetails user={data} />}</div>
      <div className="grid grid-cols-3">
        <div className=" col-span-2"></div>
      </div>
    </>
  )
}
