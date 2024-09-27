'use client'
import { useCallback } from 'react'

type TProps = {
  type: string
  image?: string
  colors?: string[]
}
export default function IconTerm({ type, image, colors }: TProps) {
  const renderIcon = useCallback(() => {
    switch (type) {
      case 'color':
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
                <img src={image} className="w-8 h-8" />
              </picture>
            )}
          </div>
        )
    }
  }, [colors, image, type])
  return <div>{renderIcon()}</div>
}
