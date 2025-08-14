'use client'

import { Input } from '@heroui/react'
import Variations from './variations'
import Gallery from './gallery'
import DisplayCategory from '@/components/category/displayCategory'
import EmbedVideo from './embedVideo'
import { usePublishStore } from '@/store/publish'
import { PostSchema } from '@/types/posts'
import { ReactNode, useEffect, useState } from 'react'
import RichTextEditor from '@/components/UI/RichTextEditor'
import ProductTitleInput from './title/page'
import { shallow } from 'zustand/shallow'
import SaveButtonProduct from './saveButton'
import ShortDescriptionProduct from './shortDescription'
import DescriptionProduct from './description'
import CategoriesProduct from './categories'

export default function PublishEditor({ data }: { data?: PostSchema }) {
  const id = usePublishStore((state) => state.id)
  const status = usePublishStore((state) => state.status)
  const setData = usePublishStore((state) => state.setData)
  const reset = usePublishStore((state) => state.reset)

  const [dataSuccess, setDataSuccess] = useState(false)

  useEffect(() => {
    if (data) {
      setData(data)
    } else if (id !== 'new') {
      console.log('Contenido reseteado')
      reset()
    }
    setDataSuccess(true)
  }, [data, setData, id, reset])

  return (
    <>
      <div className="grid grid-cols-12 mt-10 gap-8 m-auto max-w-360">
        <div className=" col-span-7 mb-24">
          <ProductTitleInput />

          <div className="mt-5">
            <ShortDescriptionProduct content={data?.shortDescription} />
          </div>

          <div className="mt-5">
            <p className="text-sm mb-1">Galería</p>
            <Gallery />
          </div>

          <div className="mt-10 w-full">
            <p className="text-sm mb-2">Agregar productos</p>
            {dataSuccess && <Variations />}
          </div>
          <div className="mt-5">
            <DescriptionProduct content={data?.description} />
          </div>
        </div>
        <div className=" col-span-5">
          <p className="mb-1">Guardar</p>
          <div
            className={`grid  gap-x-2 mb-5 ${id === 'new' || status === 'draft' ? 'grid-cols-2' : ''} `}
          >
            <SaveButtonProduct />
          </div>

          <CategoriesProduct />
          <EmbedVideo />
        </div>
      </div>
    </>
  )
}
