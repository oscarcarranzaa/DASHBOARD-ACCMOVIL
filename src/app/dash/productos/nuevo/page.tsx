'use client'
import { createProduct } from '@/api/products'
import NavegationPages from '@/components/navegationPages'
import { newProduct } from '@/types/poducts'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CheckSVG from '@/components/icons/check'
import ToastInfo from '@/components/UI/toast'
import ProductEditor from '@/components/products/productEditor/'

export default function NewProduct() {
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: createProduct,
    onSuccess: (success) => {
      toast(
        <ToastInfo
          text="Guardado Correctamente"
          url="/"
          label="Ver Producto"
        />,
        {
          icon: <CheckSVG size={20} />,
        }
      )
    },
  })
  const handleForm = (formData: newProduct) => {
    mutate(formData)
  }

  return (
    <>
      <NavegationPages text="Agregar un nuevo producto" />
      <div>weijgo3hg</div>
      <ProductEditor
        handleForm={handleForm}
        error={error}
        isPending={isPending}
      />
      <ProductEditor
        handleForm={handleForm}
        error={error}
        isPending={isPending}
      />
      <div>
        <ProductEditor
          handleForm={handleForm}
          error={error}
          isPending={isPending}
        />
      </div>
      <div>
        <ProductEditor
          handleForm={handleForm}
          error={error}
          isPending={isPending}
        />
      </div>
      <div>
        <ProductEditor
          handleForm={handleForm}
          error={error}
          isPending={isPending}
        />
      </div>
      <div>
        <ProductEditor
          handleForm={handleForm}
          error={error}
          isPending={isPending}
        />
      </div>
      <div>tjrti56</div>
      <div>rehyerj</div>
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
          //theme="dark"
        />
      </span>
    </>
  )
}
