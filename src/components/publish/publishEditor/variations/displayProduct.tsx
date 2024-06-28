import { updateOneProductImage } from '@/api/products'
import DisplayPrice from '@/components/displayPrice'
import ModalMedia from '@/components/media/modalMedia'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { getProductImageSchema } from '@/types/poducts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type TProps = {
  select: getProductImageSchema
}
export default function DisplayProduct({ select }: TProps) {
  const [getImage, setGetImage] = useState<IUploads[] | undefined>()
  const [defaultImage, setDefaultImage] = useState<IUploads[] | undefined>()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: updateOneProductImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [select._id] })
    },
  })
  useEffect(() => {
    if (getImage) {
      // mutate({ image: getImage[0], id: select._id })
    }
  }, [getImage])
  useEffect(() => {
    const defaultMediaValues = select.image?.images
      ? [
          {
            mediaIDItem: select?.image._id,
            id: select?.image?.mediaId,
            imgURI: select.image.images[3].src,
            name: select?.image?.title,
            urlMedia: select.image.images[6].src,
          },
        ]
      : []
    setDefaultImage(defaultMediaValues)
  }, [select])
  return (
    <div className="mt-5 w-full bg-zinc-950 border border-zinc-700 rounded-md px-5 py-2">
      <div>
        <div className="flex w-full items-center">
          <div className="w-16 mr-2 flex-none">
            <SelectImage
              select="only"
              iconSize={40}
              setValue={setGetImage}
              defaultMedias={defaultImage}
            />
          </div>
          <div className="flex justify-between w-full text-left">
            <div>
              <p className=" line-clamp-2">{select.name}</p>
              <div className="flex">
                <p className="text-xs text-green-500 line-clamp-1">
                  {select.code}
                </p>
                <p className="text-xs text-zinc-500 ml-5">
                  <span className=" text-yellow-500">{select.stock} und</span>{' '}
                </p>
              </div>
            </div>
            <div>
              <DisplayPrice
                price={select.price}
                discountPrice={select.priceDiscount?.price}
                startDate={select.priceDiscount?.start}
                endDate={select.priceDiscount?.end}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
