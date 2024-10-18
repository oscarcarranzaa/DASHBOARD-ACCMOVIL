'use client'
import Bank from '@/components/icons/bank'
import ClockSVG from '@/components/icons/clock'
import Money from '@/components/icons/money'
import { Checkbox, cn, Button } from '@nextui-org/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import SquareImage from '@/components/squareImage'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { finishOrder } from '@/api/order'
import { createOrderState } from '@/store/order'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()

  const orderId = createOrderState((state) => state.orderId)
  const resetOrder = createOrderState((state) => state.reset)
  const { mutate, isPending } = useMutation({
    mutationFn: finishOrder,
    onSuccess: (sc) => {
      setSuccessTransact(true)
      resetOrder()
      if (orderId) {
        router.push(`${orderId}/finalizado`)
      }
    },
    onError: () => {
      toast.error('Error al agregar pago a la orden.')
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
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData()
    if (paymentMethod === 'BANK_TRANSFER' && !data.image) {
      toast.error('Agrega la foto del comprobante')
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
      'inline-flex max-w-md bg-content1 m-0',
      'hover:bg-zinc-50 dark:hover:bg-zinc-800 items-center justify-start',
      'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
      'data-[selected=true]:border-primary'
    ),
    label: 'w-full',
  }

  const disabledButton = isPending || successTransact
  return (
    <div>
      <p className="font-semibold">Finalizar orden</p>
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
            disabled={disabledButton}
          >
            {disabledButton ? (
              <Spinner fill="#fff" size={26} />
            ) : (
              <ClockSVG size={26} />
            )}
            Dejar pendiente pago
          </Button>
        )}
        {paymentMethod === 'CASH' && (
          <Button
            className="w-full stroke-black stroke-2"
            color="success"
            size="lg"
            disabled={disabledButton}
            type="submit"
          >
            {disabledButton ? (
              <Spinner fill="#000" size={26} />
            ) : (
              <Money size={26} />
            )}
            Pagar en efectivo
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
              isDisabled={!preview || disabledButton}
            >
              {disabledButton ? (
                <Spinner fill="#000" size={26} />
              ) : (
                <Bank size={26} />
              )}
              Procesar transferencia
            </Button>
          </>
        )}
      </form>
    </div>
  )
}
