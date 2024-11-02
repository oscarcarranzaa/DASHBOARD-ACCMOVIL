'use client'
import { createProduct } from '@/api/products'
import NavegationPages from '@/components/navegationPages'
import { newProductSchema } from '@/types/products'
import { useMutation } from '@tanstack/react-query'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import ProductEditor from '@/components/publish/publishEditor/productEditor'

export default function NewProduct() {
  return (
    <>
      <NavegationPages text="Agregar un nuevo producto" />
      <ProductEditor />
      <Toaster theme="dark" richColors />
    </>
  )
}
