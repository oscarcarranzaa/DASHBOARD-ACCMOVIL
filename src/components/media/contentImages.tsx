'use client'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import MenuDotsSVG from '../icons/menuDots'
import MediaAction from './mediaActions'
import useOutsideClick from '@/hooks/useOutSideClick'

import { CircularProgress } from '@nextui-org/progress'
import Link from 'next/link'
import { Checkbox, cn } from '@nextui-org/react'
import { IUploads } from './upload/drag'

interface IProps {
  id: string
  image: string
  url: string
  name: string
  load?: number
  mediaID: string
  isSelect?: 'only' | 'multiple'
  check: boolean
  selectItem?: React.Dispatch<SetStateAction<IUploads[]>>
}
export default function ContentImages({
  image,
  url,
  name,
  load,
  mediaID,
  id,
  isSelect,
  check,
  selectItem,
}: IProps) {
  const [isDeletingChild, setIsDeletingChild] = useState(false)
  const [select, setSelect] = useState(check)

  const ref = useRef<HTMLElement>(null)
  const [openActions, setOpenActions] = useState(false)
  useOutsideClick(ref, () => setOpenActions(false))
  useEffect(() => {
    setSelect(check)
  }, [check])
  const isLoading = load ? load > 100 : true
  const handleSelect = () => {
    if (!isLoading) return
    setSelect(!select)
    const mediaInfo: IUploads = {
      mediaIDItem: id,
      id: mediaID,
      imgURI: image,
      name: name,
    }
    if (selectItem) {
      if (!select && isSelect === 'multiple') {
        selectItem((prev) => [...prev, mediaInfo])
        return
      }
      if (!select && isSelect === 'only') {
        selectItem([mediaInfo])
        return
      }
      selectItem((prev) => prev.filter((idMedia) => idMedia.id !== mediaID))
    }
  }
  return (
    <>
      <div
        className={`max-w-80  max-h-80 ${isDeletingChild ? 'hidden' : ''} ${isSelect && isLoading ? ' cursor-pointer' : ''}`}
        onClick={handleSelect}
      >
        <div
          className={`p-3 pl-4 pr-4 bg-zinc-200 dark:bg-zinc-700  rounded-md relative border ${select && isSelect ? 'border-sky-600' : 'border-transparent '}`}
        >
          <div ref={ref as React.MutableRefObject<HTMLDivElement>}>
            {isSelect ? (
              <div className="absolute z-10 right-0 top-0  p-1 rounded-md">
                <Checkbox isSelected={select} onChange={handleSelect} />
              </div>
            ) : (
              <button
                className="stroke-white fill-white absolute bg-slate-400 right-5 top-4 p-1 rounded-md hover:bg-violet-400 z-10"
                onClick={() => setOpenActions(!openActions)}
              >
                <MenuDotsSVG size={20} />
              </button>
            )}
            <div
              className={`absolute right-5 z-20 top-12 ${openActions ? '' : 'hidden'}`}
            >
              <MediaAction
                url={url}
                name={name}
                mediaID={mediaID}
                setIsDeletingChild={setIsDeletingChild}
              />
            </div>
          </div>
          <div
            className=" rounded-md  overflow-hidden relative"
            style={{ paddingTop: 'calc(100% + 4px)' }}
          >
            <div
              className=" absolute h-full w-full overflow-hidden"
              style={{
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
              }}
            >
              <img
                src={image}
                loading="lazy"
                decoding="async"
                alt="Imagen de covertor"
                className="  rounded-md w-full  h-full object-contain m-auto"
              />
            </div>

            {load && load <= 100 ? (
              <div
                className="absolute z-50 top-0 bottom-0 right-0 left-0 flex justify-center items-center text-white"
                style={{ background: 'rgba(0,0,0,0.7)' }}
              >
                <div>
                  <CircularProgress
                    value={load}
                    aria-label="Loading..."
                    size="lg"
                    color="success"
                    showValueLabel={true}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {isSelect ? (
            <p className="text-xs line-clamp-1 mt-1">{name}</p>
          ) : (
            <Link
              href={`/dash/multimedia/${id}`}
              target="_blank"
              className="text-xs line-clamp-1 mt-1 hover:underline"
            >
              {name}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}