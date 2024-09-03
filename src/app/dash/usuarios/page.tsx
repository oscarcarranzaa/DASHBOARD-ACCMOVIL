'use client'
import { getAllUsers } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import NewUserForm from '@/components/users/newUser'
import UserList from '@/components/users/userList'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const rows = 5
export default function ClientPage() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const { data, isPending } = useQuery({
    queryKey: ['users', currentPage.toString(), search],
    queryFn: () => getAllUsers(currentPage.toString(), rows.toString(), search),
    refetchOnWindowFocus: false,
  })
  return (
    <>
      <NavegationPages text="Usuarios" />

      <div className="mb-3 flex justify-between">
        <Search placeHolder="Buscar usuario..." />
        <NewUserForm />
      </div>
      <div className="mb-16">
        <UserList data={data} rows={rows} isPending={isPending} />
      </div>
    </>
  )
}
