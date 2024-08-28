import IconTerm from '@/components/attributes/terms/iconTerm'
import CloseSVG from '@/components/icons/close'
import { Key } from '@react-types/shared'
import { SetStateAction } from 'react'

type TProps = {
  name: string
  id: string
  type: string
  image?: string
  colors?: string[]
  Close: React.Dispatch<SetStateAction<Key[]>>
}
export default function ChipItems({
  name,
  id,
  type,
  image,
  colors,
  Close,
}: TProps) {
  return (
    <div className="flex-none dark:bg-zinc-800 px-2 py-1 rounded-xl mr-2 bg-zinc-100">
      <div className="flex items-center ">
        <IconTerm type={type} colors={colors} image={image} />
        <p className="text-xs ml-2">{name}</p>
        <div className="ml-2">
          <button
            className="dark:fill-white p-1 rounded-full dark:hover:bg-zinc-700"
            onClick={() => {
              Close((prev) => prev.filter((att) => att !== id))
            }}
          >
            <CloseSVG size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
