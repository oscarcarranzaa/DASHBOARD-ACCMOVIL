import { getDataMedias } from '@/api/media'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export default function useGetMedia() {
  const searchParams = useSearchParams()
  const pageValue = searchParams.get('pageMedia') ?? '1'
  const page = Number(pageValue) || 1
  const search = searchParams.get('searchMedia') ?? ''

  const { data } = useQuery({
    queryKey: ['medias', pageValue, search],
    queryFn: () => getDataMedias(page, 53, search),
    refetchOnWindowFocus: false,
  })
  const allMedia = data?.data
  const dataItem = allMedia
    ? allMedia.map((i) => {
        const mediaImage = i.qualities ? i.qualities[1].src : i.url
        const urlImage = i.url
        return {
          imgURI: mediaImage,
          urlMedia: urlImage,
          name: i.title,
          id: i.id,
        }
      })
    : null
  return { data: dataItem, totalPages: data?.totalPages }
}
