'use client'
import CategoryEditor from '@/components/category/categoryEditor'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import useUserInfo from '@/hooks/useUserInfo'
import { verifyAccess } from '@/lib/verifyAccess'

export default function Categories() {
  const { userData } = useUserInfo()
  const userRoles = userData?.role ? userData.role.keys : null
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
      {userData && <CategoryEditor />}
    </>
  )
}
