import { useState } from 'react'

type TProps = {
  children: React.ReactNode
  name: string
  items?: boolean
}

export default function DisplayGroupVariations({
  children,
  name,
  items,
}: TProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="  border-b dark:border-zinc-700"
        onClick={() => setOpen(!open)}
      >
        <div className=" p-3">
          <p>{name}:</p>
        </div>
      </div>
      <div className={`${open ? 'block' : 'hidden'}`}>{children}</div>
    </>
  )
}
