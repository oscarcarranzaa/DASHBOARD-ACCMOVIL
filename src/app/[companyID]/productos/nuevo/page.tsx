'use client'
import { createProduct } from '@/api/products'
import NavegationPages from '@/components/navegationPages'
import { newProductSchema } from '@/types/products'
import { useMutation } from '@tanstack/react-query'
import ProductEditor from '@/components/products/productEditor/'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'

export default function NewProduct() {
  const router = useRouter()
  const { mutate, isPending, error } = useMutation({
    mutationFn: createProduct,
    onSuccess: (response) => {
      toast.success('Producto creado exitosamente', {
        action: {
          label: 'Ver Producto',
          onClick: () => router.push(`/dash/productos/${response.id}`),
        },
      })
    },
  })
  const handleForm = (formData: newProductSchema) => {
    mutate(formData)
  }

  return (
    <>
      <NavegationPages text="Agregar un nuevo producto" />
      <ProductEditor
        handleForm={handleForm}
        error={error}
        isPending={isPending}
      />
      <Toaster theme="dark" richColors />
    </>
  )
}
