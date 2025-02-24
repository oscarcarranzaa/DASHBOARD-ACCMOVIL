import useOutsideClick from '@/hooks/useOutSideClick'
import { useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@heroui/react'
type TProps = {
  color: string
  onChange: (color: string) => void
  icon: React.ReactNode
}
export default function ColorPicker({ color, onChange, icon }: TProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))
  return (
    <>
      <div ref={ref} className="relative">
        <button
          className="z-0 group relative inline-flex items-center justify-center rounded-lg  bg-default text-default-foreground min-w-8 w-8 h-8 "
          onClick={() => setOpen(!open)}
        >
          {icon}
        </button>
        {open && (
          <div className="absolute top-10 -right-[100px] z-20 bg-zinc-100 dark:bg-zinc-700 p-2 rounded-lg border border-zinc-500 dark:border-zinc-300">
            <HexColorPicker
              color={color}
              onChange={(color) => {
                onChange(color)
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
