import CloseSVG from '@/components/icons/close'
import { TSelectMedia } from '@/components/media/'
import { useEffect, useRef, useState } from 'react'
import DragMedia from './upload/drag'
import { Button } from '@nextui-org/button'
import { IUploads } from '@/types'
import useOutsideClick from '@/hooks/useOutSideClick'
import Search from '../UI/search'
import useGetMedia from '@/hooks/useGetMedias'

interface IProps extends TSelectMedia {
  setValue: (media: IUploads[] | undefined) => void
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
  const [mediaSelect, setMediaSelect] = useState<IUploads[] | undefined>()
  const [selectedMedia, setSelectedMedia] = useState<IUploads[] | undefined>(
    defaultMedias
  )

  const ref = useRef<HTMLElement>(null)
  const { data, totalPages } = useGetMedia()

  useEffect(() => {
    setMediaSelect(defaultMedias)
  }, [defaultMedias, selectedMedia])

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

  useOutsideClick(ref, () => closeModal())
  return (
    <div>
      <div
        className={`fixed  top-0 bottom-0 left-0 right-0 min-w-full z-50 p-10 ${openModal ? 'flex' : 'hidden'} justify-center`}
        style={{
          backgroundColor: 'var(--box-opacity)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div
          className="bg-white dark:bg-zinc-900 overflow-hidden  dark:fill-white w-11/12 rounded-2xl relative max-w-6xl border border-zinc-300 dark:border-zinc-600 "
          ref={ref as React.MutableRefObject<HTMLDivElement>}
        >
          <div className="mb-10 flex justify-between items-center bg-zinc-100 dark:bg-black p-5 py-3">
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
          <div className="px-3">
            <Search
              searchName="searchMedia"
              pageName="pageMedia"
              placeHolder="Buscar medio..."
            />
            <div className="overflow-y-scroll max-h-screen mt-5">
              <div className="mb-60 pb-1">
                <DragMedia
                  select={select}
                  dataMedia={data}
                  mediaSelect={mediaSelect}
                  totalPages={totalPages}
                  setMediasSelect={setMediaSelect}
                />
              </div>
            </div>
          </div>
          <div className=" flex justify-between items-center bg-white dark:bg-black border-t border-zinc-300 p-8 py-3 absolute bottom-0 right-0 left-0 z-20">
            <div>
              {mediaSelect && mediaSelect.length > 0 ? (
                <button
                  className=" text-sky-600 hover:underline"
                  onClick={clearSelect}
                >
                  Limpiar selección
                </button>
              ) : null}
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
