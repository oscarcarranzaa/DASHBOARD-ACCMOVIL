'use client'
import { getDataMedias } from '@/api/media'
import { useQuery } from '@tanstack/react-query'

export default function getMedia() {
  const { data, isPending } = useQuery({
    queryKey: ['medias'],
    queryFn: () => getDataMedias('1', '50'),
    refetchOnWindowFocus: false,
  })
  const allMedia = data?.data
  const dataItem = allMedia
    ? allMedia.map((i) => {
        const mediaImage = i.images ? i.images[2].src : i.url
        return {
          imgURI: mediaImage,
          name: i.title,
          id: i.mediaId,
          mediaIDItem: i._id,
        }
      })
    : null
  return dataItem
}
