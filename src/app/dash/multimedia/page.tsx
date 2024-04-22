'use client'
import { getDataMedias } from '@/api/media'
import ContentImages from '@/components/media/contentImages'
import { useQuery } from '@tanstack/react-query'

export default function Media() {
  const { data, isPending } = useQuery({
    queryKey: ['medias'],
    queryFn: () => getDataMedias('1', '10'),
    refetchOnWindowFocus: false,
  })
  const allMedia = data?.data
  console.log(data, isPending)
  return (
    <>
      <div>Desde Multimedia</div>
      <div className="m-5 grid grid-cols-3 md:grid-cols-4 gap-1 lg:grid-cols-6">
        {data &&
          allMedia?.map((media) => (
            <ContentImages key={media._id} image={media.url} />
          ))}
      </div>
    </>
  )
}
