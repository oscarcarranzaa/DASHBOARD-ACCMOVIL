'use client'
import { updateUserAvatar } from '@/api/userData'
import { Skeleton, Spinner } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type TProps = {
  avatar?: string | null
}
export default function ChangeAvatar({ avatar }: TProps) {
  const avatarImage = avatar === null ? '/static/default-profile.png' : avatar
  const [preview, setPreview] = useState<string | null | undefined>(avatarImage)

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      toast.success('Foto de perfil actualizada')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (err) => {
      toast.error(err.message)
      setPreview(avatarImage)
    },
  })

  useEffect(() => {
    if (avatar) {
      setPreview(avatar)
    }
  }, [avatar])
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      submitAvatar(file)
    } else {
      setPreview(avatarImage)
    }
  }
  const submitAvatar = (avatar: File) => {
    const formData = new FormData()
    formData.append('file', avatar)
    mutate(formData)
  }
  return (
    <>
      <div className="w-full dark:bg-neutral-950 border dark:border-zinc-600 border-zinc-300 bg-white rounded-xl grid grid-cols-2 p-4 px-5">
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold mb-3">Foto de perfil</p>
          <p className="text-sm">Esta es tu foto de perfil.</p>
          <p className="text-sm">Haz click en la foto para cambiarla.</p>
        </div>
        <div className="flex justify-end">
          {avatarImage ? (
            <label
              htmlFor="image-upload"
              className={`${isPending ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="rounded-full border-5 border-transparent w-[100px] h-[100px] hover:border-zinc-500 overflow-hidden relative">
                <picture>
                  <img
                    className="w-[100px] h-[100px] object-cover"
                    src={preview ?? '/static/default-profile.png'}
                    alt="Imagen de usuario"
                  />
                </picture>
                {isPending && (
                  <div
                    className="absolute top-0 bottom-0 left-0 right-0 z-10 flex justify-center items-center"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                  >
                    <Spinner color="success" />
                  </div>
                )}
              </div>
            </label>
          ) : (
            <div className="rounded-full w-[100px] h-[100px] overflow-hidden ">
              <Skeleton className="w-full h-full" />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
      </div>
    </>
  )
}
