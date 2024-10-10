import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import SquareImage from '@/components/squareImage'
import { Input, Button } from '@nextui-org/react'
import Bank from '@/components/icons/bank'

interface FormData {
  image: FileList
}

export default function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsUploading(true)

    const formData = new FormData()
    formData.append('image', data.image[0])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" mb-5">
        <p className=" text-center mb-1 font-semibold">
          Imagen del comprobante
        </p>
        <input
          type="file"
          accept="image/*"
          {...register('image', { required: 'Please upload an image' })}
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload" className=" cursor-pointer">
          {preview ? (
            <div>
              <div className=" max-w-60 m-auto">
                <SquareImage src={preview} />
              </div>
            </div>
          ) : (
            <div className=" max-w-60 m-auto  aspect-square w-full border-dashed border rounded-lg border-zinc-500 flex justify-center items-center">
              <p>Subir imagen</p>
            </div>
          )}
        </label>

        {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
      </div>
      <Button
        className="w-full stroke-black stroke-2"
        color="success"
        size="lg"
        isDisabled={!preview}
      >
        <Bank size={26} />
        Procesar transferencia
      </Button>
    </form>
  )
}
