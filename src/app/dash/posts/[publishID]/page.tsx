'use client'

import { getPost } from '@/api/posts'
import NotFound from '@/components/errorsPages/notFound'
import NavegationPages from '@/components/navegationPages'
import PublishEditor from '@/components/publish/publishEditor/'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function EditPublish() {
  const params = useParams()
  const { publishID } = params as { publishID: string }
  const { data, isError } = useQuery({
    queryKey: [publishID],
    queryFn: () => getPost(publishID),
    refetchOnWindowFocus: false,
  })
  const title = data ? data.title : 'Cargando...'
  if (isError) {
    return <NotFound message="No se pudo encontrar el post." />
  }
  return (
    <>
      <NavegationPages text={title} />

      {data && <PublishEditor data={data} />}
    </>
  )
}
