'use client'
import CategoryEditor from '@/components/category/categoryEditor'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import { usePermit } from '@/hooks/usePermit'

export default function Categories() {
  const verify = usePermit({
    keys: ['product:categories'],
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
