import { orderPaidByTransfer } from '@/api/order'
import Bank from '@/components/icons/bank'
import Spinner from '@/components/icons/spinner'
import SquareImage from '@/components/squareImage'
import { Button } from '@heroui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { toast } from 'sonner'

type TProps = {
  orderId: string
  totalAmount: number
  onClose: () => void
}
export default function OrderBank({ orderId, totalAmount, onClose }: TProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<FileList | null>(null)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: orderPaidByTransfer,
    onSuccess: () => {
      toast.success('Transaccion exitosa.')
      onClose()
      queryClient.invalidateQueries({ queryKey: ['order', orderId, 'details'] })
    },
    onError: () => {
      toast.error('Ocurrió un error al agregar la transaccion')
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten archivos de imagen.')
        setPreview(null)
        return
      }
      setImage(e.target.files)
      setError(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImage(null)
      setPreview(null)
      setError(null)
    }
  }

  const onSubmit = () => {
    const formData = new FormData()
    if (!image) {
      toast.error('Agrega la foto del comprobante')
      return
    }
    formData.append('file', image[0])
    mutate({ form: formData, id: orderId })
  }
  return (
    <>
      <form className="px-3 w-full flex flex-col justify-center">
        <div className="dark:stroke-white stroke-black flex flex-col items-center">
          <Bank size={48} />
          <p className=" font-semibold ">Pago por transferencia Bancaria</p>
          <p className=" text-xs">
            Sube el recibo/comprobante de la transacción, asegurate de que sea
            el correcto.
          </p>
        </div>
        <div className=" mt-5">
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
        </div>
        {error && <p className=" text-xs font-medium text-danger">{error}</p>}
        <div className="mt-5 w-full">
          <Button color="success" className="w-full" onPress={onSubmit}>
            {isPending ? <Spinner fill="#000" size={26} /> : <Bank size={26} />}
            <p className="font-semibold">
              Pagar{' '}
              {totalAmount.toLocaleString('es-HN', {
                style: 'currency',
                currency: 'HNL',
              })}
            </p>
          </Button>
        </div>
      </form>
    </>
  )
}
