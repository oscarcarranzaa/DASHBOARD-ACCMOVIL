'use client'
import { createProduct } from '@/api/products'
import Spinner from '@/components/icons/spinner'
import WarningInfo from '@/components/icons/warningInfo'
import SelectMedia from '@/components/media/selectMedia'
import NavegationPages from '@/components/navegationPages'
import { newProduct, product } from '@/types/poducts'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  DateRangePicker,
  DateValue,
  Input,
  RangeValue,
  Switch,
  Textarea,
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import CheckSVG from '@/components/icons/check'
import ToastInfo from '@/components/toast'
import ProductEditor from '@/components/products/productEditor'

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
      <ProductEditor
        handleForm={handleForm}
        error={error}
        isPending={isPending}
      />
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
