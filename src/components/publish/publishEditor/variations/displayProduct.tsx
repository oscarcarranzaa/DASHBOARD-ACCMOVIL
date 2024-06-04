import { updateOneProductImage } from '@/api/products'
import SelectMedia from '@/components/media/selectMedia'
import { getProductImageSchema } from '@/types/poducts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type TProps = {
  select: getProductImageSchema
}
export default function DisplayProduct({ select }: TProps) {
  const [getImage, setGetImage] = useState<string[] | undefined>()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: updateOneProductImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [select._id] })
    },
  })
  useEffect(() => {
    if (getImage) {
      mutate({ image: getImage[0], id: select._id })
    }
  }, [getImage])
  return (
    <div className="mt-5 w-full bg-zinc-950 rounded-md px-5 py-2">
      {select && (
        <div>
          <div className="flex">
            <div className="w-12 mr-2">
              <SelectMedia select="only" setValue={setGetImage} />
            </div>
            <div>
              <p>{select.name}</p>
              <p className="text-sm">{select.code}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
