import { Dispatch, SetStateAction, use, useEffect, useState } from 'react'
import ModalMedia from './modalMedia'
import { TSelectMedia } from '.'
import { IUploads } from '@/types'
import GallerySVG from '../icons/gallery'

interface IProps extends TSelectMedia {
  iconSize: number
  setValue: Dispatch<SetStateAction<IUploads[] | undefined>>
  defaultMedias?: IUploads[]
}
export default function SelectImage({
  setValue,
  iconSize,
  defaultMedias,
}: IProps) {
  const [selecMedia, setSelectMedia] = useState<IUploads[] | undefined>()
  const [isModalMedia, setIsModalMedia] = useState(false)
  useEffect(() => {
    setValue(selecMedia)
  }, [selecMedia])
  return (
    <>
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
            {selecMedia && selecMedia.length > 0 ? (
              <picture>
                <img
                  src={selecMedia[0].imgURI}
                  loading="lazy"
                  decoding="async"
                  alt="Imagen de covertor"
                  className="  rounded-md w-full  h-full object-contain m-auto"
                />
              </picture>
            ) : (
              <div className="flex justify-center flex-col">
                <div className="flex justify-center">
                  <GallerySVG size={iconSize} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalMedia
        setValue={setSelectMedia}
        closeModal={() => setIsModalMedia(false)}
        openModal={isModalMedia}
        select="only"
        defaultMedias={defaultMedias}
      />
    </>
  )
}
