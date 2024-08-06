'use client'

import { Button, Input } from '@nextui-org/react'
import Variations from './variations'
import Gallery from './gallery'
import DisplayCategory from '@/components/category/displayCategory'
import EmbedVideo from './embedVideo'
import { usePublishStore } from '@/store/publish'
import ShortDescriptionPost from './textEditor/shortDescription'
import DescriptionPost from './textEditor/description'
import { PostSchema } from '@/types/posts'
import { useEffect } from 'react'

export default function PublishEditor({ data }: { data?: PostSchema }) {
  const { title, categories, id, status } = usePublishStore(
    (state) => state.postData
  )

  const { setTitle, setCagories, reset, setData } = usePublishStore()

  useEffect(() => {
    if (data) {
      setData(data)
    }
    if (!data && id !== 'new') {
      reset()
    }
  }, [data, setData])
  const isNew = id === 'new'
  const isPublish = status === 'publish'
  return (
    <>
      <div className="grid grid-cols-12 mt-10 gap-8 m-auto max-w-[90rem]">
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
        <div className=" col-span-5">
          <p className="mb-1">Guardar</p>
          <div
            className={`grid  gap-x-2 mb-5 ${isNew && !isPublish && 'grid-cols-2'}`}
          >
            <Button color="primary">
              {isNew || !isPublish ? 'Publicar' : 'Actualizar'}
            </Button>
            {isNew && !isPublish && <Button>Guardar</Button>}
          </div>

          <DisplayCategory
            value={categories}
            onSelectCategory={(select) => setCagories(select)}
          />
          <EmbedVideo />
        </div>
      </div>
    </>
  )
}
