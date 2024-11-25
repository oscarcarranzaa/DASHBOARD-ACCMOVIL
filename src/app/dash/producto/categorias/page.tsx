'use client'
import CategoryEditor from '@/components/category/categoryEditor'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import { verifyAccess } from '@/lib/verifyAccess'
import { useAuthStore } from '@/store/auth'

export default function Categories() {
  const user = useAuthStore((state) => state.user)
  const userRoles = user?.role ? user.role.keys : null
  const verify = verifyAccess({
    keys: ['posts.categoriesAllActions'],
    userKeys: userRoles,
  })
  if (!verify)
    return (
      <ErrorsPages
        message="No tienes permisos para esta accion"
        errorRef={403}
      />
    )
  return (
    <>
      <NavegationPages text="Categorías" />
      {<CategoryEditor />}
    </>
  )
}
