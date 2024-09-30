import { updateOneProductImage } from '@/api/products'
import DisplayPrice from '@/components/displayPrice'
import SelectImage from '@/components/media/selectImage'
import { usePublishStore } from '@/store/publish'
import { IUploads } from '@/types'
import { productSchema } from '@/types/products'
import { Spinner } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type TProps = {
  select: productSchema
}
export default function DisplayProduct({ select }: TProps) {
  const [getImage, setGetImage] = useState<IUploads[] | undefined>()
  const [defaultImage, setDefaultImage] = useState<IUploads[] | undefined>()
  const queryClient = useQueryClient()
  const getVariations = usePublishStore((state) => state.variations)
  const { Product } = usePublishStore((state) => state.postData)
  const setProductID = usePublishStore((state) => state.setProductId)
  const setVariation = usePublishStore((state) => state.setVariation)

  const { mutate, isPending } = useMutation({
    mutationFn: updateOneProductImage,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [select.id] })
      if (Product?.id === select.id) {
        setProductID({ ...Product, media: res })
      } else {
        const updateImageVariations = getVariations?.map((variation) => {
          const variationsID = variation.productId
          if (variationsID === select.id) {
            const { Product } = variation
            const productValue = Product ? { ...Product, media: res } : null

            return { ...variation, product: productValue }
          }
          return variation
        })
        setVariation(updateImageVariations)
      }
    },
  })

  useEffect(() => {
    const productImage = select.image

    if (getImage && getImage.length === 1 && getImage[0].id !== productImage) {
      mutate({ image: getImage[0].id, id: select.id })
    }
  }, [getImage, mutate, select.id, select.image])
  useEffect(() => {
    if (select.media?.qualities) {
      const defaultMediaValues = select.image
        ? [
            {
              id: select?.image,
              imgURI: select.media.qualities[2].src,
              name: select?.media?.title,
              urlMedia: select.media.url,
            },
          ]
        : []
      setDefaultImage(defaultMediaValues)
    }
  }, [select])
  return (
    <div className="mt-8 w-full dark:bg-zinc-950 ">
      <div>
        <div className="flex w-full items-center">
          <div className="w-16 mr-2 flex-none relative">
            <SelectImage
              select="only"
              iconSize={40}
              setValue={setGetImage}
              defaultMedias={defaultImage}
            />
            {isPending && (
              <div
                className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center rounded-lg"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                <Spinner size="sm" color="white" />
              </div>
            )}
          </div>
          <div className="flex justify-between w-full text-left">
            <div>
              <p className=" line-clamp-2 text-sm">{select.name}</p>
              <div className="flex">
                <p className="text-xs dark:text-green-500 text-green-600 line-clamp-1 font-bold">
                  {select.sku}
                </p>
                <p className="text-xs text-zinc-500 ml-5">
                  <span className=" dark:text-yellow-500 text-yellow-600 font-semibold">
                    {select.stock} und
                  </span>
                </p>
              </div>
            </div>
            <div>
              <DisplayPrice
                price={select.price}
                discountPrice={select.discountPrice}
                startDate={select.startDiscount}
                endDate={select.endDiscount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
