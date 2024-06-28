import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IUploads } from '@/types'
import { TSelectMedia } from '@/components/media'
import ModalMedia from '@/components/media/modalMedia'
import PlusSVG from '@/components/icons/plus'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import SelectGalleryItem from './selectItem'

interface IProps extends TSelectMedia {
  setValue: Dispatch<SetStateAction<IUploads[] | undefined>>
  defaultMedias?: IUploads[]
}
export default function SelecImageGallery({ setValue, defaultMedias }: IProps) {
  const [selecMedia, setSelectMedia] = useState<IUploads[] | undefined>()
  const [isModalMedia, setIsModalMedia] = useState(false)
  const [defaultSelected, setDefaultSelected] = useState<
    IUploads[] | undefined
  >(defaultMedias)

  useEffect(() => {
    setValue(selecMedia)
  }, [selecMedia])

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!selecMedia || active.id === over?.id) return

    const oldIndex = selecMedia.findIndex(
      (item) => item.mediaIDItem === active.id
    )
    const newIndex = selecMedia.findIndex(
      (item) => item.mediaIDItem === over?.id
    )
    const newItems = arrayMove(selecMedia, oldIndex, newIndex)
    setDefaultSelected(newItems)
    setSelectMedia(newItems)
  }
  return (
    <>
      <div className=" grid grid-cols-6 xl:grid-cols-8 gap-2 w-full h-full">
        {selecMedia && selecMedia.length > 0 ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selecMedia.map((media) => media.mediaIDItem)}
              strategy={rectSortingStrategy}
            >
              {selecMedia.map((media, index) => (
                <SelectGalleryItem
                  isLarge={index === 0}
                  key={media.mediaIDItem}
                  imgURI={media.imgURI}
                  mediaIDItem={media.mediaIDItem}
                  name={media.name}
                  id={media.id}
                  urlMedia={media.urlMedia}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : null}
        {selecMedia && selecMedia.length > 0 ? (
          <div
            className="rounded-md overflow-hidden relative cursor-pointer border-3 border-dashed hover:bg-zinc-200"
            style={{ paddingTop: 'calc(100% - 6px)' }}
            onClick={() => setIsModalMedia(!isModalMedia)}
          >
            <div
              className="absolute  overflow-hidden flex items-center justify-center"
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
        {!selecMedia && (
          <div
            className="flex justify-center flex-col cursor-pointer col-span-6"
            onClick={() => setIsModalMedia(!isModalMedia)}
          >
            <div className="flex justify-center text-sm hover:underline">
              Selecciona imágenes para la galería..
            </div>
          </div>
        )}
      </div>
      <ModalMedia
        setValue={setSelectMedia}
        closeModal={() => setIsModalMedia(false)}
        openModal={isModalMedia}
        select="multiple"
        defaultMedias={defaultSelected}
      />
    </>
  )
}
