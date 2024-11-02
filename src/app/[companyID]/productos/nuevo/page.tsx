'use client'

import NavegationPages from '@/components/navegationPages'
import ProductEditor from '@/components/publish/publishEditor/productEditor'

export default function NewProduct() {
  return (
    <>
      <NavegationPages text="Agregar un nuevo producto" />
      <ProductEditor />
    </>
  )
}
