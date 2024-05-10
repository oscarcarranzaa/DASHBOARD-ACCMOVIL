import CloseSVG from '@/components/icons/close'
import Media, { TSelectMedia } from '@/components/media/'
import { SetStateAction, useEffect, useState } from 'react'
import DragMedia, { IUploads } from './upload/drag'
import getMedia from '@/utils/getMedia'
import { Button } from '@nextui-org/button'
import GallerySVG from '../icons/gallery'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { newProduct } from '@/types/poducts'

interface IProps extends TSelectMedia {
  setValue: UseFormSetValue<newProduct>
  reset?: boolean
}
export default function SelectMedia({ select, setValue, reset }: IProps) {
  const [isModalMedia, setIsModalMedia] = useState(false)
  const [mediaSelect, setMediaSelect] = useState<IUploads[] | []>([])
  useEffect(() => {
    if (reset) {
      setMediaSelect([])
    }
  }, [reset])
  const dataItem = getMedia()
  const handleSelect = () => {
    setIsModalMedia(!isModalMedia)
  }
  const selectId = mediaSelect.map((id) => id.mediaIDItem).toString()
  console.log(selectId)
  setValue('image', selectId?.length > 0 ? selectId : undefined)
  return (
    <div>
      <div
        onClick={() => setIsModalMedia(!isModalMedia)}
        className="cursor-pointer"
      >
        <div
          className=" rounded-md  overflow-hidden relative bg-zinc-200 dark:bg-zinc-800"
          style={{ paddingTop: '100%' }}
        >
          <div
            className=" absolute h-full w-full overflow-hidden flex items-center justify-center"
            style={{
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%',
            }}
          >
            {mediaSelect && mediaSelect.length > 0 ? (
              <img
                src={mediaSelect[0].imgURI}
                loading="lazy"
                decoding="async"
                alt="Imagen de covertor"
                className="  rounded-md w-full  h-full object-contain m-auto"
              />
            ) : (
              <div className="flex justify-center flex-col">
                <div className="flex justify-center">
                  <GallerySVG size={120} />
                </div>
                <p className="text-center">Selecciona una imagen...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed  top-0 bottom-0 left-0 right-0 min-w-full z-50 p-10 ${isModalMedia ? 'block' : 'hidden'} `}
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <div className="bg-zinc-100 dark:bg-zinc-800 p-5  dark:fill-white">
          <div className="mb-10 flex justify-between">
            <p>Selector de medios</p>
            <button onClick={() => setIsModalMedia(false)} type="button">
              <CloseSVG size={20} />
            </button>
          </div>
          <div className="overflow-y-scroll max-h-screen">
            <div className="mb-40">
              <DragMedia
                select={select}
                dataMedia={dataItem}
                mediaSelect={mediaSelect}
                setMediasSelect={setMediaSelect}
              />
              {select ? (
                <div className="absolute bottom-0 left-12 right-20 bg-zinc-200 dark:bg-black border-t border-zinc-600 z-20 flex gap-2 min-h-20  p-2 justify-between items-center">
                  <div className="flex gap-2 ml-5">
                    {mediaSelect?.map((slt) => {
                      return (
                        <>
                          <div className="relative">
                            <div
                              onClick={() =>
                                setMediaSelect((prev) =>
                                  prev.filter(
                                    (idMedia) => idMedia.id !== slt.id
                                  )
                                )
                              }
                              className=" absolute top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center opacity-0  hover:opacity-100 cursor-pointer fill-white rounded"
                              style={{ background: 'rgba(0,0,0,0.5)' }}
                            >
                              <CloseSVG size={20} />
                            </div>
                            <picture>
                              <img
                                src={slt.imgURI}
                                className="w-14 h-14 object-cover select-none rounded"
                                alt={slt.name}
                              />
                            </picture>
                          </div>
                        </>
                      )
                    })}
                  </div>
                  <div className="mr-5">
                    <Button
                      disabled={mediaSelect.length < 1}
                      onClick={handleSelect}
                      color="primary"
                      type="button"
                      className={
                        mediaSelect.length > 0
                          ? ''
                          : ' cursor-not-allowed bg-zinc-600'
                      }
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
