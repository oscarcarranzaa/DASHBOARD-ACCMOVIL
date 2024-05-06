'use client'
import { getDataMedias } from '@/api/media'
import ContentImages from '@/components/media/contentImages'
import { useQuery } from '@tanstack/react-query'
import DragMedia from '@/components/media/upload/drag'
import { Checkbox } from '@nextui-org/react'

const selectOp = {
  ONLY: 'only',
  MULTIPLE: 'multiple',
} as const

export type TSelectMedia = {
  select?: (typeof selectOp)[keyof typeof selectOp]
}

export default function Media({ select }: TSelectMedia) {
  const { data, isPending } = useQuery({
    queryKey: ['medias'],
    queryFn: () => getDataMedias('1', '30'),
    refetchOnWindowFocus: false,
  })

  const allMedia = data?.data
  const dataItem = allMedia
    ? allMedia.map((i) => {
        const mediaImage = i.images ? i.images[2].src : i.url
        return { imgURI: mediaImage, name: i.title, id: i._id }
      })
    : null
  return (
    <>
      <DragMedia select={select} dataMedia={dataItem}>
        {/* {data &&
          allMedia?.map((media) => {
            if (media.images) {
              const mediaImage =
                media.images?.length > 3 ? media.images[2].src : media.url
              return (
                <ContentImages
                  key={media._id}
                  mediaID={media.mediaId}
                  image={mediaImage}
                  url={media.url}
                  name={media.title}
                  isSelect={isSelect}
                />
              )
            }
          })} */}
      </DragMedia>
    </>
  )
}
