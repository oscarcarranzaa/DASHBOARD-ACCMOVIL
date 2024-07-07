'use client'
import TextEditor from '@/components/textEditor'
import { Input } from '@nextui-org/react'
import Variations from './variations'
import Gallery from './gallery'
import DisplayCategory from '@/components/category/displayCategory'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/api/category'

export default function PublishEditor() {
  const { data, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    refetchOnWindowFocus: false,
  })
  console.log(data)
  return (
    <>
      <div className="grid grid-cols-12 mt-10 gap-8 m-auto">
        <div className=" col-span-8 mb-24">
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
        <div className=" col-span-3">
          <DisplayCategory />
        </div>
      </div>
    </>
  )
}
