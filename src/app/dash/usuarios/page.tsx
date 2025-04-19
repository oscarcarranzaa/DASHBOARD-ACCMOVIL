import NavegationPages from '@/components/navegationPages'
import Search from '@/components/UI/search'
import NewUserForm from '@/components/users/newUser'
import AccessComponent from '@/components/users/roles/accessComponent'
import UserList from '@/components/users/userList'
import { Suspense } from 'react'

export default function ClientPage() {
  return (
    <>
      <NavegationPages text="Usuarios" />

      <div>
        <div className="mb-3 flex justify-between">
          <Suspense>
            <Search placeHolder="Buscar usuario..." />
          </Suspense>
          <AccessComponent keys={['admin']}>
            <NewUserForm />
          </AccessComponent>
        </div>
        <div className="mb-16">
          <Suspense>
            <UserList />
          </Suspense>
        </div>
      </div>
    </>
  )
}
