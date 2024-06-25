import { useState } from 'react'

type TProps = {
  children: React.ReactNode
  name: string
  total?: number
}

export default function DisplayGroupVariations({
  children,
  name,
  total,
}: TProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="">
        <div
          className={` border-2 hover:border-primary border-zinc-200 dark:border-zinc-700   mt-2 cursor-pointer bg-zinc-50 dark:bg-transparent dark:bg-zinc-900" ${open ? 'rounded-t-2xl' : 'rounded-2xl'}`}
          onClick={() => setOpen(!open)}
        >
          <div className=" p-3 flex">
            <p>{name}:</p>
            <p>{total}</p>
          </div>
        </div>
        <div
          className={`${open ? 'block rounded-b-2xl overflow-hidden border-2 border-t-0 border-zinc-200 dark:border-zinc-700' : 'hidden'}`}
        >
          {children}
        </div>
      </div>
    </>
  )
}
