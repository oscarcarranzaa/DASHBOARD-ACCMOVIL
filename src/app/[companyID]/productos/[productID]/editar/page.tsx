'use client'
import { getOneProduct, updateOneProduct } from '@/api/products'
import NotFound from '@/components/errorsPages/notFound'
import CheckSVG from '@/components/icons/check'
import NavegationPages from '@/components/navegationPages'
import ProductEditor from '@/components/products/productEditor/'
import ToastInfo from '@/components/UI/toast'
import { newProduct } from '@/types/poducts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

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
      toast(
        <ToastInfo
          text="Guardado Correctamente"
          url={`/dash/productos/${productID}`}
          label="Ver Producto"
        />,
        {
          icon: <CheckSVG size={20} />,
        }
      )
    },
  })
  const handleForm = (formData: newProduct) => {
    mutate({ formData: formData, id: productID })
  }
  if (error) return <NotFound message={error.message} />
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
      <span className="stroke-green-600 fill-green-600">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          stacked
        />
      </span>
    </>
  )
}
