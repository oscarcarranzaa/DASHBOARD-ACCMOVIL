'use client'
import { getOneClient } from '@/api/client'
import NavegationPages from '@/components/navegationPages'
import UserDetails from '@/components/users/userDetails'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function ClientSee() {
  const params = useParams()
  const ID = params.clientID
  const { data, isPending } = useQuery({
    queryKey: ['user', ID],
    queryFn: () => getOneClient(ID.toString()),
    refetchOnWindowFocus: false,
  })
  return (
    <>
      <NavegationPages text={data?.name ?? 'Cliente...  '} />

      <div>{data && <UserDetails user={data} />}</div>
      <div className="grid grid-cols-3">
        <div className=" col-span-2"></div>
      </div>
    </>
  )
}
