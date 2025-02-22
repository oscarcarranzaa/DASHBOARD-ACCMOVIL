'use client'

import { Button, Input } from '@heroui/react'
import Variations from './variations'
import Gallery from './gallery'
import DisplayCategory from '@/components/category/displayCategory'
import EmbedVideo from './embedVideo'
import { usePublishStore } from '@/store/publish'
import { PostSchema } from '@/types/posts'
import { ReactNode, useEffect, useState } from 'react'
import TextEditor from '@/components/UI/textEditor/editor'

export default function PublishEditor({
  data,
  action,
  children,
}: {
  data?: PostSchema
  action?: (action: 'publish' | 'draft') => void
  children?: ReactNode
}) {
  const { title, categories, id, status } = usePublishStore(
    (state) => state.postData
  )
  const [dataSuccess, setDataSuccess] = useState(false)
  const isNew = id === 'new'
  const isPublish = status === 'publish'
  const description = usePublishStore((state) => state.postData.description)
  const shortDescription = usePublishStore(
    (state) => state.postData.shortDescription
  )

  const {
    setTitle,
    setCagories,
    reset,
    setData,
    setShortDescription,
    setDescription,
  } = usePublishStore()

  useEffect(() => {
    if (data) {
      setData(data)
    } else if (id !== 'new') {
      reset()
    }
    setDataSuccess(true)
  }, [data, setData, id, reset])

  const handleShortDescription = (newContent: string) => {
    if (newContent !== shortDescription) {
      setShortDescription(newContent)
    }
  }
  const handleDescription = (newContent: string) => {
    if (newContent !== description) {
      setDescription(newContent)
    }
  }

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
            <TextEditor
              onChange={handleShortDescription}
              initialValue={data?.shortDescription}
            />
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
            <p className="text-sm mb-1">Descripción</p>

            <TextEditor
              onChange={handleDescription}
              initialValue={data?.description}
            />
          </div>
        </div>
        <div className=" col-span-5">
          <p className="mb-1">Guardar</p>
          <div
            className={`grid  gap-x-2 mb-5 ${isNew || !isPublish ? 'grid-cols-2' : ''} `}
          >
            {children}
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
