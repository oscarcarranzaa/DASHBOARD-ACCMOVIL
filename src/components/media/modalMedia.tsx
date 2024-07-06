import CloseSVG from '@/components/icons/close'
import { TSelectMedia } from '@/components/media/'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import DragMedia from './upload/drag'
import getMedia from '@/utils/getMedia'
import { Button } from '@nextui-org/button'
import { IUploads } from '@/types'

interface IProps extends TSelectMedia {
  setValue: Dispatch<SetStateAction<IUploads[] | undefined>>
  closeModal: () => void
  defaultMedias?: IUploads[]
  openModal: boolean
}
export default function ModalMedia({
  select,
  openModal,
  setValue,
  closeModal,
  defaultMedias,
}: IProps) {
  const [mediaSelect, setMediaSelect] = useState<IUploads[] | undefined>(
    defaultMedias
  )
  const [selectedMedia, setSelectedMedia] = useState<IUploads[] | undefined>(
    defaultMedias
  )
  const dataItem = getMedia()

  useEffect(() => {
    const value = defaultMedias ?? undefined
    setMediaSelect(defaultMedias)
    setSelectedMedia(value)
  }, [defaultMedias])

  const handleSelect = () => {
    setSelectedMedia(mediaSelect?.length ? mediaSelect : undefined)
    closeModal()
  }
  const cancelSelect = () => {
    setMediaSelect(selectedMedia)
    closeModal()
  }
  const clearSelect = () => {
    setMediaSelect(undefined)
  }

  useEffect(() => {
    setValue(selectedMedia)
  }, [selectedMedia])
  return (
    <div>
      <div
        className={`fixed  top-0 bottom-0 left-0 right-0 min-w-full z-50 p-10 ${openModal ? 'flex' : 'hidden'} justify-center`}
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <div className="bg-zinc-100 dark:bg-zinc-800 overflow-hidden  dark:fill-white w-11/12 rounded-2xl relative">
          <div className="mb-10 flex justify-between items-center bg-zinc-200 dark:bg-black p-5 py-3">
            <p className=" font-semibold">Selector de medios</p>
            <button
              onClick={() => closeModal()}
              type="button"
              className="fill-zinc-700 dark:fill-zinc-300 rounded-full p-2 hover:bg-zinc-300 dark:hover:bg-zinc-700"
              title="Cerrar"
            >
              <CloseSVG size={20} />
            </button>
          </div>
          <div className="overflow-y-scroll max-h-screen">
            <div className="mb-60">
              <DragMedia
                select={select}
                dataMedia={dataItem}
                mediaSelect={mediaSelect}
                setMediasSelect={setMediaSelect}
              />
            </div>
          </div>
          <div className=" flex justify-between items-center bg-white dark:bg-black border-t border-zinc-300 p-8 py-3 absolute bottom-0 right-0 left-0 z-20">
            <div>
              <button
                className=" text-sky-600 hover:underline"
                onClick={clearSelect}
              >
                Limpiar
              </button>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSelect} color="primary">
                Seleccionar
              </Button>
              <Button onClick={cancelSelect}>Cancelar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
