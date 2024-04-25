'use client'
import { useRef, useState } from 'react'
import MenuDotsSVG from '../icons/menuDots'
import MediaAction from './mediaActions'
import useOutsideClick from '@/hooks/useOutSideClick'

import { CircularProgress } from '@nextui-org/progress'

interface IProps {
  image: string
  url: string
  name: string
  load?: number
}
export default function ContentImages({ image, url, name, load }: IProps) {
  const ref = useRef<HTMLElement>(null)
  const [openActions, setOpenActions] = useState(false)
  useOutsideClick(ref, () => setOpenActions(false))
  return (
    <>
      <div className=" max-w-80  max-h-80">
        <div className="p-3 pl-4 pr-4 bg-zinc-200 dark:bg-zinc-800  rounded-md relative">
          <div ref={ref as React.MutableRefObject<HTMLDivElement>}>
            <button
              className="stroke-white fill-white absolute bg-slate-400 right-5 top-4 p-1 rounded-md hover:bg-violet-400 z-10"
              onClick={() => setOpenActions(!openActions)}
            >
              <MenuDotsSVG size={20} />
            </button>
            <div
              className={`absolute right-5 z-20 top-12 ${openActions ? '' : 'hidden'}`}
            >
              <MediaAction url={url} name={name} />
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
                className="absolute z-50 top-0 bottom-0 right-0 left-0 flex justify-center items-center"
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
          <p className="text-xs line-clamp-1 mt-1 hover:underline">{name}</p>
        </div>
      </div>
    </>
  )
}
