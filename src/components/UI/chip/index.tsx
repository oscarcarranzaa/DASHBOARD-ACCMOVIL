import CloseSVG from '@/components/icons/close'
import { Key } from '@react-types/shared'
import { SetStateAction, useCallback } from 'react'

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
  const renderIcon = useCallback(() => {
    switch (type) {
      case 'colors':
        return (
          <div>
            <div className=" -rotate-45 w-6 h-6 rounded-full overflow-hidden">
              {colors?.map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 ${colors?.length > 1 ? '  -translate-y-3 ' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )
      case 'option':
        return null
      case 'image':
        return (
          <div className=" rounded-md overflow-hidden">
            {image && (
              <picture>
                <img src={image} className="w-8 h-8" />{' '}
              </picture>
            )}
          </div>
        )
    }
  }, [])
  return (
    <div className="flex-none dark:bg-zinc-800 px-2 py-1 rounded-xl mr-2">
      <div className="flex items-center ">
        {renderIcon()}
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
