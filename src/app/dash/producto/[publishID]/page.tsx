'use client'

import { getPost, updatePost } from '@/api/posts'
import NotFound from '@/components/errorsPages/notFound'
import Spinner from '@/components/icons/spinner'
import NavegationPages from '@/components/navegationPages'
import PublishEditor from '@/components/publish/publishEditor/'
import PublishEditorSkeleton from '@/components/publish/publishEditor/skeleton'
import { usePublishStore } from '@/store/publish'
import { Button } from '@heroui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function EditPublish() {
  const [buttonAction, setButtonAction] = useState<'draft' | 'publish'>()

  const params = useParams()
  const { publishID } = params as { publishID: string }
  const queryClient = useQueryClient()
  const { data, isError } = useQuery({
    queryKey: [publishID],
    queryFn: () => getPost(publishID),
    refetchOnWindowFocus: false,
  })

  const {
    data: response,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: updatePost,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [publishID] })
      toast.success('Producto atualizado')
    },
    onError: (err) => {
      toast.error('Ocurrio un error')
    },
  })

  const title = data ? data.title : 'Cargando resultado...'

  const postData = usePublishStore((state) => state.postData)
  const variations = usePublishStore((state) => state.variations)

  const post = useMemo(
    () => ({
      title: postData.title,
      categories: postData.categories?.map((c) => c.id),
      description: postData.description,
      shortDescription: postData.shortDescription,
      status: postData.status,
      type: postData.type,
      product: postData.product,
      gallery: postData.gallery?.map((g) => g.id),
      variations: variations
        ?.filter((v) => !v.isDeleted)
        .map((v) => ({
          id: v.id,
          attributes: v.attributesTerms.map((t) => t.id),
          product: v.product ?? undefined,
        })),
      youtubeVideoId: postData.youtubeVideoId,
    }),
    [postData, variations]
  )

  const handleSave = (action: 'publish' | 'draft') => {
    setButtonAction(action)
    const savePostStatus = { ...post, status: action }
    mutate({ postID: publishID, formData: savePostStatus })
  }

  if (isError) {
    return <NotFound message="No se pudo encontrar el producto." />
  }

  const isPublish = data?.status === 'publish'

  return (
    <>
      <NavegationPages text={title} />
      <div className="w-full">
        <Toaster richColors theme="dark" />
      </div>

      {data ? (
        <PublishEditor data={data} action={handleSave}>
          <Button
            color="primary"
            onPress={() => handleSave('publish')}
            type="submit"
            disabled={isPending}
          >
            {buttonAction === 'publish' && isPending ? (
              <div className=" animate-spin">
                <Spinner size={24} fill="#fff" />
              </div>
            ) : !isPublish ? (
              'Publicar'
            ) : (
              'Actualizar'
            )}
          </Button>
          {!isPublish ? (
            <Button onPress={() => handleSave('draft')} disabled={isPending}>
              {buttonAction === 'draft' && isPending ? (
                <div className=" animate-spin">
                  <Spinner size={24} fill="#fff" />
                </div>
              ) : (
                'Guardar'
              )}
            </Button>
          ) : null}
        </PublishEditor>
      ) : (
        <PublishEditorSkeleton />
      )}
    </>
  )
}
