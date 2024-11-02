import { Dispatch, SetStateAction, use, useEffect, useState } from 'react'
import ModalMedia from './modalMedia'
import { TSelectMedia } from '.'
import { IUploads } from '@/types'
import GallerySVG from '../icons/gallery'

interface IProps extends TSelectMedia {
  iconSize: number
  setValue: (val: IUploads[] | undefined) => void
  defaultMedias?: IUploads[]
}
export default function SelectImage({
  setValue,
  iconSize,
  defaultMedias,
}: IProps) {
  const [selectMedia, setSelectMedia] = useState<IUploads[] | undefined>(
    defaultMedias
  )
  const [isModalMedia, setIsModalMedia] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsModalMedia(!isModalMedia)}
        className="cursor-pointer"
      >
        <div
          className=" rounded-md  overflow-hidden relative bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-zinc-400 dark:border-zinc-600"
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
            {selectMedia && selectMedia.length > 0 ? (
              <picture>
                <img
                  src={selectMedia[0].imgURI}
                  loading="lazy"
                  decoding="async"
                  alt="Imagen de covertor"
                  className="  rounded-md w-full  h-full object-contain m-auto"
                />
              </picture>
            ) : (
              <div className="flex justify-center flex-col">
                <div className="flex justify-center  stroke-zinc-600 dark:stroke-zinc-400">
                  <GallerySVG size={iconSize} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalMedia
        setValue={(media) => {
          setSelectMedia(media)
          setValue(media)
        }}
        closeModal={() => setIsModalMedia(false)}
        openModal={isModalMedia}
        select="only"
        defaultMedias={selectMedia}
      />
    </>
  )
}
