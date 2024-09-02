'use client'
import { getAllClients } from '@/api/client'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import UserList from '@/components/users/userList'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const rows = 30
export default function ClientPage() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const { data, isPending } = useQuery({
    queryKey: ['users', currentPage.toString(), search],
    queryFn: () =>
      getAllClients(currentPage.toString(), rows.toString(), search),
    refetchOnWindowFocus: false,
  })
  return (
    <>
      <NavegationPages text="Clientes" />
      <div className="mb-3">
        <Search placeHolder="Buscar cliente..." />
      </div>
      <div className="mb-16">
        <UserList data={data} rows={rows} isPending={isPending} />
      </div>
    </>
  )
}
