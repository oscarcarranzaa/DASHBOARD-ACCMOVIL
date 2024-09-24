'use client'
import { getOneProduct, updateOneProduct } from '@/api/products'
import ErrorsPages from '@/components/errorsPages'
import NotFound from '@/components/errorsPages/notFound'
import NavegationPages from '@/components/navegationPages'
import ProductEditor from '@/components/products/productEditor/'
import { newProductSchema } from '@/types/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function EditProduct() {
  const params = useParams()
  const { productID } = params as { productID: string }
  const { data, error } = useQuery({
    queryKey: [productID],
    queryFn: () => getOneProduct(productID),
    retry: false,
    refetchOnWindowFocus: false,
  })
  const queryClient = useQueryClient()
  const {
    mutate,
    isPending,
    error: updateError,
    data: updateData,
  } = useMutation({
    mutationFn: updateOneProduct,
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: [productID] })
      toast.success('Producto actualizado...')
    },
  })
  const handleForm = (formData: newProductSchema) => {
    mutate({ formData: formData, id: productID })
  }
  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  return (
    <>
      <NavegationPages text="Editar producto" />
      {data && (
        <ProductEditor
          productValues={data}
          handleForm={handleForm}
          isPending={isPending}
          error={updateError}
        />
      )}

      <Toaster theme="dark" richColors />
    </>
  )
}
