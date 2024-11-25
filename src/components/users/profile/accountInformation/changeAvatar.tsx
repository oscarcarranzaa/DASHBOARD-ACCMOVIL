'use client'
import { Skeleton } from '@nextui-org/react'
import { useState } from 'react'

type TProps = {
  avatar?: string | null
}
export default function ChangeAvatar({ avatar }: TProps) {
  const avatarImage = avatar === null ? '/static/default-profile.png' : avatar
  const [preview, setPreview] = useState<string | null | undefined>(avatarImage)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(avatarImage)
    }
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
            <label htmlFor="image-upload" className="cursor-pointer">
              <picture>
                <img
                  className="rounded-full border-5 border-transparent w-[100px] h-[100px] hover:border-zinc-500 object-cover"
                  src={preview ?? '/static/default-profile.png'}
                  alt="Imagen de usuario"
                />
              </picture>
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
