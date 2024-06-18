import ArrowAngleSVG from '@/components/icons/arrowAngle'
import { useState } from 'react'

export default function Select() {
  const [select, setSelect] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const items = [
    {
      id: 'hiafu',
      name: 'Modelos',
    },
    {
      id: 'sgs',
      name: 'Colores',
    },
    {
      id: 'gssg',
      name: 'Diseños',
    },
    {
      id: 'gewrg',
      name: 'Material',
    },
  ]

  return (
    <>
      <div>
        <div className="relative  w-60 ">
          <div
            className="p-2 flex justify-between  bg-zinc-800 rounded-md border border-zinc-500 select-none"
            onClick={() => setOpen(!open)}
          >
            <p>{select ?? 'Selecciona'}</p>
            <span className=" -rotate-90 dark:fill-white">
              <ArrowAngleSVG size={24} />
            </span>
          </div>
          <div
            className={`${!open ? 'hidden' : 'block'} absolute bg-zinc-800 right-0 left-0 p-2`}
          >
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className=" hover:bg-zinc-900 w-full p-1 px-2 rounded-md"
                >
                  <p>{item.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
