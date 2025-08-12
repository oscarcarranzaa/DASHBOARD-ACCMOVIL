'use client'
import Bank from '@/components/icons/bank'
import ClockSVG from '@/components/icons/clock'
import Money from '@/components/icons/money'
import { Checkbox, cn, Button, addToast, Alert } from '@heroui/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import SquareImage from '@/components/squareImage'
import { useMutation } from '@tanstack/react-query'
import { finishOrder } from '@/api/order'
import { createOrderState } from '@/store/order'
import Spinner from '@/components/icons/spinner'

interface FormData {
  image: FileList | null
}

const paymentMethods = ['BANK_TRANSFER', 'CASH'] as const

export default function FinishOrder() {
  const [preview, setPreview] = useState<string | null>(null)
  const [successTransact, setSuccessTransact] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<
    'BANK_TRANSFER' | 'CASH' | 'PENDING'
  >('PENDING')

  const resetOrder = createOrderState((state) => state.reset)
  const orderInfo = createOrderState((state) => state.orderInfo)
  const setNavegation = createOrderState((state) => state.navegation)
  const setOrderSuccessId = createOrderState((state) => state.setOrderSuccessId)
  const { products, navegation } = createOrderState((state) => state)

  const { mutate, isPending } = useMutation({
    mutationFn: finishOrder,
    onSuccess: (sc) => {
      setSuccessTransact(true)
      resetOrder()
      setOrderSuccessId(sc.id)
      setNavegation('finalice')
    },
    onError: (err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrió un error',
        description: err.message,
      })
    },
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue('image', e.target.files)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
      setValue('image', null)
    }
  }
  const totalPaid = orderInfo?.totalAmount ?? 0
  const paidInCents = Math.round(totalPaid * 100) / 100

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (totalPaid < 1) {
      addToast({
        color: 'warning',
        variant: 'bordered',
        timeout: 5000,
        title: 'Advertencia de error',
        description: 'No se puede procesar la orden en 0',
      })

      return
    }
    const formData = new FormData()
    if (paymentMethod === 'BANK_TRANSFER' && !data.image) {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Agrega la foto del comprobante',
      })

      return
    }
    if (data.image && paymentMethod === 'BANK_TRANSFER') {
      formData.append('file', data.image[0])
    }
    formData.append('paymentMethod', paymentMethod)
    mutate({ form: formData })
  }

  const checkClass = {
    base: cn(
      'inline-flex max-w-md bg-zinc-100 dark:bg-zinc-900 m-0',
      'hover:bg-zinc-50 dark:hover:bg-zinc-800 items-center justify-start',
      'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
      'data-[selected=true]:border-primary'
    ),
    label: 'w-full',
  }
  const disabledButton = successTransact || products.length === 0
  return (
    <div>
      <p className="font-semibold mb-5">Finalizar orden</p>
      {products.length === 0 && (
        <Alert
          color="warning"
          variant="bordered"
          title="Advertencia"
          endContent={
            <Button
              color="warning"
              onPress={() => navegation('details')}
              variant="flat"
            >
              Ir a productos
            </Button>
          }
          description="Para finalizar la orden, debes agregar al menos un producto"
        />
      )}
      <div className="flex gap-x-3 flex-wrap mt-5">
        {paymentMethods.map((method) => (
          <Checkbox
            key={method}
            aria-label={
              method === 'BANK_TRANSFER' ? 'Transferencia bancaria' : 'Efectivo'
            }
            isSelected={paymentMethod === method}
            onChange={() =>
              setPaymentMethod(paymentMethod === method ? 'PENDING' : method)
            }
            classNames={checkClass}
          >
            <div className="w-full flex justify-between gap-2">
              <div>
                <p className="font-semibold">
                  {method === 'BANK_TRANSFER'
                    ? 'Transferencia Bancaria'
                    : 'Efectivo'}
                </p>
                <p className="text-xs opacity-70 font-semibold">
                  {method === 'BANK_TRANSFER'
                    ? 'Se requiere foto del comprobante.'
                    : 'Una forma de vender en físico.'}
                </p>
              </div>
              <div className="dark:stroke-white stroke-black ml-10">
                {method === 'BANK_TRANSFER' ? (
                  <Bank size={42} />
                ) : (
                  <Money size={42} />
                )}
              </div>
            </div>
          </Checkbox>
        ))}
      </div>

      <form className="mt-14 mb-5" onSubmit={handleSubmit(onSubmit)}>
        {paymentMethod === 'PENDING' && (
          <Button
            className="w-full stroke-white stroke-2"
            color="danger"
            size="lg"
            type="submit"
            disabled={disabledButton || isPending}
          >
            {isPending ? (
              <Spinner fill="#fff" size={26} />
            ) : (
              <ClockSVG size={26} />
            )}
            Dejar pendiente pago <b>(HNL {paidInCents})</b>
          </Button>
        )}
        {paymentMethod === 'CASH' && (
          <Button
            className="w-full stroke-black stroke-2"
            color="success"
            size="lg"
            disabled={disabledButton || isPending}
            type="submit"
          >
            {isPending ? (
              <Spinner fill="#000" size={26} />
            ) : (
              <Money size={26} />
            )}
            Pagar en efectivo <b>(HNL {paidInCents})</b>
          </Button>
        )}
        {paymentMethod === 'BANK_TRANSFER' && (
          <>
            <div className="mb-5">
              <p className="text-center mb-1 font-semibold">
                Imagen del comprobante
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {preview ? (
                  <div className="max-w-60 m-auto">
                    <SquareImage src={preview} />
                  </div>
                ) : (
                  <div className="max-w-60 m-auto aspect-square w-full border-dashed border rounded-lg border-zinc-500 flex justify-center items-center">
                    <p>Subir imagen</p>
                  </div>
                )}
              </label>
              {errors.image && (
                <p className="text-red-500 text-xs">{errors.image.message}</p>
              )}
            </div>
            <Button
              className="w-full stroke-black stroke-2"
              color="success"
              size="lg"
              type="submit"
              isDisabled={!preview || disabledButton || isPending}
            >
              {isPending ? (
                <Spinner fill="#000" size={26} />
              ) : (
                <Bank size={26} />
              )}
              Procesar transferencia <b>(HNL {paidInCents})</b>
            </Button>
          </>
        )}
      </form>
    </div>
  )
}
