'use client'

import { getPost } from '@/api/posts'
import NavegationPages from '@/components/navegationPages'
import PublishEditor from '@/components/publish/publishEditor/'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function EditPublish() {
  const params = useParams()
  const { publishID } = params as { publishID: string }
  const { data } = useQuery({
    queryKey: [publishID],
    queryFn: () => getPost(publishID),
  })
  const title = data ? data.title : 'Cargando...'
  return (
    <>
      <NavegationPages text={title} />
      {data && <PublishEditor data={data} />}
    </>
  )
}
