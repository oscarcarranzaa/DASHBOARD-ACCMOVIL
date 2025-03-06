'use client'

import { getPost } from '@/api/posts'
import NotFound from '@/components/errorsPages/notFound'

import NavegationPages from '@/components/navegationPages'
import PublishEditor from '@/components/publish/publishEditor/'
import PublishEditorSkeleton from '@/components/publish/publishEditor/skeleton'

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

  const pageTitle = data ? data.title : 'Cargando resultado...'

  if (isError) {
    return <NotFound message="No se pudo encontrar el producto." />
  }

  return (
    <>
      <NavegationPages text={pageTitle} />

      {data ? <PublishEditor data={data} /> : <PublishEditorSkeleton />}
    </>
  )
}
