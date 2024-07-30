'use client'

import { Button, Input } from '@nextui-org/react'
import Variations from './variations'
import Gallery from './gallery'
import DisplayCategory from '@/components/category/displayCategory'
import EmbedVideo from './embedVideo'
import { usePublishStore } from '@/store/publish'
import ShortDescriptionPost from './textEditor/shortDescription'
import DescriptionPost from './textEditor/description'

export default function PublishEditor() {
  const { title } = usePublishStore((state) => state.postData)
  const setTitle = usePublishStore((state) => state.setTitle)
  return (
    <>
      <div className="grid grid-cols-12 mt-10 gap-8 m-auto">
        <div className=" col-span-7 mb-24">
          <Input
            variant="bordered"
            isRequired
            label="Titulo"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div className="mt-5">
            <p className="text-sm mb-1">Descripción corta</p>
            <ShortDescriptionPost />
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
            <DescriptionPost />
          </div>
        </div>
        <div className=" col-span-4">
          <p className="mb-1">Guardar</p>
          <div className=" grid grid-cols-2 gap-x-2 mb-5">
            <Button color="primary">Publicar</Button>
            <Button>Borrador</Button>
          </div>

          <DisplayCategory />
          <EmbedVideo />
        </div>
      </div>
    </>
  )
}
