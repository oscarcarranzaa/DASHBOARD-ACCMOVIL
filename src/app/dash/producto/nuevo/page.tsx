'use client'
import { createPost } from '@/api/posts'
import Spinner from '@/components/icons/spinner'
import NavegationPages from '@/components/navegationPages'
import PublishEditor from '@/components/publish/publishEditor/'
import { usePublishStore } from '@/store/publish'
import { Button } from '@heroui/button'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function NewPublish() {
  const [isSaving, setIsSaving] = useState(false)
  const [buttonAction, setButtonAction] = useState<'draft' | 'publish'>()

  const router = useRouter()
  const postData = usePublishStore((state) => state.postData)
  const variations = usePublishStore((state) => state.variations)
  const { reset } = usePublishStore()
  const post = {
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
  }
  const { data: response, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      reset()
      router.push(`/dash/producto/${res.id}`)
    },
    onError: (err) => {
      setIsSaving(false)
      toast.error('Ocurrio un error')
    },
  })
  const handleSave = (action: 'publish' | 'draft') => {
    const savePostStatus = { ...post, status: action }
    if (savePostStatus.title.length > 2) {
      mutate(savePostStatus)
      setIsSaving(true)
      setButtonAction(action)
    }
  }
  return (
    <>
      <NavegationPages text="Nuevo producto" />
      <PublishEditor action={handleSave}>
        <Button
          color="primary"
          onPress={() => handleSave('publish')}
          type="submit"
          disabled={isSaving}
        >
          {buttonAction === 'publish' && isSaving ? (
            <div className=" animate-spin">
              <Spinner size={24} fill="#fff" />
            </div>
          ) : (
            'Publicar'
          )}
        </Button>
        <Button onPress={() => handleSave('draft')} disabled={isSaving}>
          {buttonAction === 'draft' && isSaving ? (
            <div className=" animate-spin">
              <Spinner size={24} fill="#fff" />
            </div>
          ) : (
            'Guardar'
          )}
        </Button>
      </PublishEditor>
    </>
  )
}
