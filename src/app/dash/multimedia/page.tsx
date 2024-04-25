'use client'
import { getDataMedias } from '@/api/media'
import ContentImages from '@/components/media/contentImages'
import { useQuery } from '@tanstack/react-query'
import DragMedia from '@/components/media/upload/drag'

export default function Media() {
  const { data, isPending } = useQuery({
    queryKey: ['medias'],
    queryFn: () => getDataMedias('1', '30'),
    refetchOnWindowFocus: false,
  })

  const allMedia = data?.data

  return (
    <>
      <div className=" p-5">
        <h2 className="text-xl font-semibold">Multimedia</h2>

        <DragMedia>
          {data &&
            allMedia?.map((media) => {
              if (media.images) {
                const mediaImage =
                  media.images?.length > 3 ? media.images[2].src : media.url
                return (
                  <ContentImages
                    key={media._id}
                    image={mediaImage}
                    url={media.url}
                    name={media.title}
                  />
                )
              }
            })}
        </DragMedia>
      </div>
    </>
  )
}
