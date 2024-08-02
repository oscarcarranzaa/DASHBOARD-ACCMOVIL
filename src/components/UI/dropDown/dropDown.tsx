import MenuDotsSVG from '@/components/icons/menuDots'
import useOutsideClick from '@/hooks/useOutSideClick'
import { useRef, useState } from 'react'
type TProps = {
  label: string
  children?: React.ReactNode
}
export default function DropDown({ label, children }: TProps) {
  const [openActions, setOpenActions] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useOutsideClick(ref, () => setOpenActions(false))
  return (
    <>
      <div ref={ref as React.MutableRefObject<HTMLDivElement>}>
        <div
          className={`absolute right-0 z-10 top-8 ${openActions ? '' : 'hidden'}`}
        >
          <div className=" p-2 rounded-md min-w-52 max-w-60 border border-zinc-500 dark:bg-zinc-950 bg-zinc-100">
            <p className="text-xs line-clamp-1 font-semibold">{label}</p>
            <hr className=" mt-1 border-zinc-400" />
            <div className="mt-2 text-xs font-medium stroke-zinc-800 dark:stroke-zinc-200 dark:fill-white">
              {children}
            </div>
          </div>
        </div>
        <button
          className="stroke-none  dark:fill-white  bg-zinc-200 dark:bg-zinc-600 right-5  p-1 rounded-md hover:fill-white hover:bg-primary "
          onClick={() => setOpenActions(!openActions)}
        >
          <MenuDotsSVG size={20} />
        </button>
      </div>
    </>
  )
}
