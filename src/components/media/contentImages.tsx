'use client'
import { useRef, useState } from 'react'
import MenuDotsSVG from '../icons/menuDots'
import MediaAction from './mediaActions'
import useOutsideClick from '@/hooks/useOutSideClick'

interface IProps {
  image: string
}
export default function ContentImages({ image }: IProps) {
  const ref = useRef<HTMLElement>(null)
  const [openActions, setOpenActions] = useState(false)
  useOutsideClick(ref, () => setOpenActions(false))
  return (
    <>
      <div className=" max-w-80 max-h-80 object-contain">
        <div className="p-3 pl-4 pr-4 bg-zinc-200 dark:bg-zinc-700  rounded-md relative">
          <div ref={ref as React.MutableRefObject<HTMLDivElement>}>
            <button
              className="stroke-white fill-white absolute bg-slate-400 right-5 top-4 p-1 rounded-md hover:bg-violet-400 z-10"
              onClick={() => setOpenActions(!openActions)}
            >
              <MenuDotsSVG size={20} />
            </button>
            <div
              className={`absolute right-0 z-20 top-12 ${openActions ? '' : 'hidden'}`}
            >
              <MediaAction />
            </div>
          </div>
          <img
            src={image}
            loading="lazy"
            decoding="async"
            alt="Imagen de covertor"
            className=" rounded-md"
          />
          <p className="text-xs line-clamp-1 mt-1 hover:underline">
            Supcase-15-pro-max.jpg
          </p>
        </div>
      </div>
    </>
  )
}
