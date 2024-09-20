import { useEffect, useState } from 'react'
import { IUploads } from '@/types'
import ModalMedia from '@/components/media/modalMedia'
import PlusSVG from '@/components/icons/plus'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import SelectGalleryItem from './selectItem'
import { usePublishStore } from '@/store/publish'

export default function Gallery() {
  const { gallery } = usePublishStore((state) => state.postData)
  const setGallery = usePublishStore((state) => state.setGallery)

  const [isModalMedia, setIsModalMedia] = useState(false)
  useEffect(() => {
    if (isModalMedia) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isModalMedia])

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!gallery || active.id === over?.id) return

    const oldIndex = gallery.findIndex((item) => item.id === active.id)
    const newIndex = gallery.findIndex((item) => item.id === over?.id)
    const newItems = arrayMove(gallery, oldIndex, newIndex)

    setGallery(newItems)
  }
  return (
    <>
      <div className="w-full min-h-24 flex justify-center items-center border border-zinc-500 rounded-xl dark:bg-zinc-900 transition-colors overflow-hidden p-2">
        <div className=" grid grid-cols-6 xl:grid-cols-8 gap-2 w-full h-full">
          {gallery && gallery.length > 0 ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={gallery ? gallery.map((media) => media.id) : []}
                strategy={rectSortingStrategy}
              >
                {gallery?.map((media, index) => (
                  <SelectGalleryItem
                    isLarge={index === 0}
                    key={media.id}
                    imgURI={media.imgURI}
                    id={media.id}
                    name={media.name}
                    urlMedia={media.urlMedia}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : null}
          {gallery && gallery.length > 0 ? (
            <div
              className="rounded-md overflow-hidden relative cursor-pointer border-3 border-dashed dark:border-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              style={{ paddingTop: 'calc(100% - 6px)' }}
              onClick={() => setIsModalMedia(!isModalMedia)}
            >
              <div
                className="absolute  overflow-hidden flex items-center justify-center dark:fill-white"
                style={{
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                }}
              >
                <PlusSVG size={24} />
              </div>
            </div>
          ) : null}
          {!gallery || gallery.length === 0 ? (
            <div
              className="flex justify-center flex-col cursor-pointer col-span-6"
              onClick={() => setIsModalMedia(!isModalMedia)}
            >
              <div className="flex justify-center text-sm hover:underline">
                Selecciona imágenes para la galería..
              </div>
            </div>
          ) : null}
        </div>
        <ModalMedia
          setValue={(e) => setGallery(e)}
          closeModal={() => setIsModalMedia(false)}
          openModal={isModalMedia}
          select="multiple"
          defaultMedias={gallery}
        />
      </div>
    </>
  )
}
