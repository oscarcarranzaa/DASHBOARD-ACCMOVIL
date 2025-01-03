/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import SelectImage from '@/components/media/selectImage'

import ProductVariationEditorModal from './productVariationModal'
import { Input } from '@nextui-org/react'
import { newProductSchema } from '@/types/products'
import { useEffect, useState } from 'react'
import { IUploads } from '@/types'
import { usePublishStore } from '@/store/publish'

type TProps = {
  name?: string
  value?: newProductSchema | null
  variationId?: string
}
export default function ProductVariationEditor({
  name,
  value,
  variationId,
}: TProps) {
  const setVariationImage = usePublishStore((state) => state.setVariationImage)
  const setPriceVariation = usePublishStore((state) => state.setPriceVariation)
  const setPriceDiscount = usePublishStore((state) => state.setPriceDiscount)

  const image = value?.image && [value.image]
  const priceProps = value?.price ?? ''
  const discountPriceProps = value?.discountPrice ?? ''

  const [defaultImage, setDefaultImage] = useState<IUploads[] | undefined>(
    image
  )
  const [price, setPrice] = useState(value?.price ?? '')
  const [discountPrice, setDiscountPrice] = useState(value?.discountPrice ?? '')

  useEffect(() => {
    const imageId = image ? image[0].id : undefined
    const defaultId = defaultImage ? defaultImage[0].id : undefined

    if (imageId !== defaultId) {
      setDefaultImage(image)
    }
  }, [image])

  useEffect(() => {
    setPrice(priceProps)
    setDiscountPrice(discountPriceProps)
  }, [priceProps, discountPriceProps])

  const invalidDiscount = Number(discountPrice) > Number(price)

  return (
    <>
      <div className="grid grid-cols-2 justify-between items-center max-w-3xl w-full bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
        <div className="flex p-1">
          <div className=" w-14 flex-none">
            <SelectImage
              iconSize={32}
              setValue={(val) => {
                setDefaultImage(val)
                if (variationId) {
                  setVariationImage({
                    image: val ? val[0] : undefined,
                    variationId,
                  })
                }
              }}
              defaultMedias={defaultImage}
            />
          </div>
          <ProductVariationEditorModal
            title={name}
            value={value}
            variationId={variationId}
          >
            <div className="w-full flex items-center h-full">
              <p className="w-full ml-3 text-xs">{name}</p>
            </div>
          </ProductVariationEditorModal>
        </div>
        <div className=" flex gap-3 ">
          <Input
            variant="bordered"
            size="sm"
            type="number"
            placeholder="0.00"
            value={price}
            onBlur={() => {
              if (variationId) {
                setPriceVariation({ price, variationId })
              }
            }}
            startContent={<p>L</p>}
            label="Precio"
            onChange={(e) => setPrice(e.target.value)}
            labelPlacement="outside"
          />
          <Input
            variant="bordered"
            size="sm"
            type="number"
            placeholder="0.00"
            isInvalid={invalidDiscount}
            startContent={<p>L</p>}
            value={discountPrice}
            onBlur={() => {
              if (invalidDiscount) {
                setDiscountPrice('')
                return
              }
              if (variationId) {
                setPriceDiscount({ discount: discountPrice, variationId })
              }
            }}
            onChange={(e) => setDiscountPrice(e.target.value)}
            label="P. Descuento"
            labelPlacement="outside"
          />
        </div>
      </div>
    </>
  )
}
