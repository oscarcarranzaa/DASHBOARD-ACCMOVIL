'use client'

import { createPost, updatePost } from '@/api/posts'
import Spinner from '@/components/icons/spinner'
import { usePublishStore } from '@/store/publish'
import { Button, addToast } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

export default function SaveButtonProduct() {
  const [buttonAction, setButtonAction] = useState<'draft' | 'publish'>()
  const [isSaving, setIsSaving] = useState(false)

  const params = useParams()
  const router = useRouter()

  const { publishID } = params as { publishID: string }

  const queryClient = useQueryClient()

  const title = usePublishStore((state) => state.title)
  const id = usePublishStore((state) => state.id)
  const categories = usePublishStore((state) => state.categories)
  const description = usePublishStore((state) => state.description)
  const shortDescription = usePublishStore((state) => state.shortDescription)
  const status = usePublishStore((state) => state.status)
  const type = usePublishStore((state) => state.type)
  const product = usePublishStore((state) => state.product)
  const gallery = usePublishStore((state) => state.gallery)
  const youtubeVideoId = usePublishStore((state) => state.youtubeVideoId)
  const reset = usePublishStore((state) => state.reset)

  const isNew = id === 'new'

  const mutation = useMutation({
    mutationFn: async (postData: typeof post) => {
      return isNew
        ? createPost(postData)
        : updatePost({ postID: publishID, formData: postData })
    },
    onSuccess: (res) => {
      setIsSaving(false)
      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: isNew ? 'Producto creado' : 'Producto actualizado',
        description: 'Los cambios se guardaron',
      })

      if (isNew) {
        reset()
        router.push(`/dash/producto/${res.id}`)
      } else {
        queryClient.invalidateQueries({ queryKey: [publishID] })
      }
    },
    onError: () => {
      setIsSaving(false)
      addToast({
        color: 'danger',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: 'Lo sentimos, los cambios no se guardaron',
      })
    },
  })

  const variations = usePublishStore((state) => state.variations)
  const post = useMemo(
    () => ({
      title: title,
      categories: categories?.map((c) => c.id),
      description: description,
      shortDescription: shortDescription,
      status: status,
      type: type,
      product: product,
      gallery: gallery?.map((g) => g.id),
      variations: variations
        ?.filter((v) => !v.isDeleted)
        .map((v) => ({
          id: v.id,
          attributes: v.attributesTerms.map((t) => t.id),
          product: v.product ?? undefined,
        })),
      youtubeVideoId: youtubeVideoId,
    }),
    [
      title,
      categories,
      description,
      shortDescription,
      status,
      type,
      product,
      gallery,
      variations,
      youtubeVideoId,
    ]
  )

  const handleSave = useCallback(
    (action: 'publish' | 'draft') => {
      if (title.length < 3) return
      setButtonAction(action)
      setIsSaving(true)
      const savePostStatus = { ...post, status: action }
      mutation.mutate(savePostStatus)
    },
    [title, post, mutation]
  )

  const renderButtonContent = (action: 'publish' | 'draft') => {
    return buttonAction === action && isSaving ? (
      <div className="animate-spin">
        <Spinner size={24} fill="#fff" />
      </div>
    ) : action === 'publish' ? (
      status === 'draft' ? (
        'Publicar'
      ) : (
        'Actualizar'
      )
    ) : (
      'Guardar'
    )
  }

  return (
    <>
      <Button
        color="primary"
        onPress={() => handleSave('publish')}
        type="submit"
        disabled={isSaving}
      >
        {renderButtonContent('publish')}
      </Button>
      {status === 'draft' ? (
        <Button onPress={() => handleSave('draft')} disabled={isSaving}>
          {renderButtonContent('draft')}
        </Button>
      ) : null}
    </>
  )
}
