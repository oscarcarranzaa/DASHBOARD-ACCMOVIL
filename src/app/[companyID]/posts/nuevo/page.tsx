'use client'
import { createPost } from '@/api/posts'
import Spinner from '@/components/icons/spinner'
import NavegationPages from '@/components/navegationPages'
import PublishEditor from '@/components/publish/publishEditor/'
import { usePublishStore } from '@/store/publish'
import { Button } from '@nextui-org/button'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
    productId: postData?.Product?.id,
    gallery: postData.gallery?.map((g) => g.id),
    variations: variations?.map((v) => ({
      attributes: v.attributesTerms.map((t) => t.id),
      productId: v.productId ?? null,
    })),
    youtubeVideoId: postData.youtubeVideoId,
  }
  const { data: response, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      reset()
      router.push(`/dash/posts/${res.id}`)
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
      <NavegationPages text="Nueva publicación" />
      <PublishEditor action={handleSave}>
        <Button
          color="primary"
          onClick={() => handleSave('publish')}
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
        <Button onClick={() => handleSave('draft')} disabled={isSaving}>
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
