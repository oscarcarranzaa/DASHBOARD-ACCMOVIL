'use client'
import ButtonBack from '@/components/buttonBack/button'
import { Button, Image, Input } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

export default function NewProduct() {
  const [isModalMedia, setIsModalMedia] = useState(false)
  const DinamicMedia = dynamic(() => import('@/components/media/'), {
    ssr: false,
  })
  return (
    <>
      <ButtonBack text="Agregar un nuevo producto" />
      <div className="mt-10 grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <Input label="Nombre del producto" variant="bordered" size="lg" />
          <div className="flex mt-5 gap-8">
            <Input label="Código de barras" variant="bordered" />
            <Input label="Código" variant="bordered" />
          </div>
          <div className="flex mt-5 gap-8">
            <Input label="Precio" variant="bordered" />
            <Input label="Precio oferta" variant="bordered" />
          </div>
        </div>
        <div onClick={() => setIsModalMedia(!isModalMedia)}>
          <div className="bg-black w-full h-80 col-span-1">
            <p>Imagen del producto</p>
          </div>
        </div>
      </div>
      <div
        className={`fixed min-h-screen min-w-full top-0 z-50 left-0 right-0 ${isModalMedia ? 'block' : 'hidden'}`}
      >
        {isModalMedia && <DinamicMedia />}
      </div>
    </>
  )
}
