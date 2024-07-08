'use client'
import TextEditor from '@/components/textEditor'
import { Input } from '@nextui-org/react'
import Variations from './variations'
import Gallery from './gallery'
import DisplayCategory from '@/components/category/displayCategory'

export default function PublishEditor() {
  return (
    <>
      <div className="grid grid-cols-12 mt-10 gap-8 m-auto">
        <div className=" col-span-7 mb-24">
          <Input variant="bordered" isRequired label="Titulo" />
          <div className="mt-5">
            <p className="text-sm mb-1">Descripción corta</p>
            <TextEditor />
          </div>
          <div className="mt-5">
            <p className="text-sm mb-1">Galería</p>
            <Gallery />
          </div>
          <div className="mt-10 w-full">
            <p className="text-sm mb-2">Agregar productos</p>
            <Variations />
          </div>
          <div className="mt-5">
            <p className="text-sm mb-1">Descripción</p>
            <TextEditor />
          </div>
        </div>
        <div className=" col-span-4">
          <DisplayCategory />
        </div>
      </div>
    </>
  )
}
