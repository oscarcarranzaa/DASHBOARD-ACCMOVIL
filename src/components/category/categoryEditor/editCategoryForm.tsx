'use client'
import { getOneCategories, updateCategory } from '@/api/category'
import Spinner from '@/components/icons/spinner'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newCategoryForm, ZNewCategoryForm } from '@/types/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Progress, Textarea } from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AdvancedSettings from './advancedSettings'
import { toast, Toaster } from 'sonner'

type TProps = {
  category: string
  categorySelected: string
  onCloseCategory: () => void
}
export default function EditCategoryForm({
  category,
  categorySelected,
  onCloseCategory,
}: TProps) {
  const [newImageValue, seNewImageValue] = useState<IUploads[]>()
  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({
    queryFn: () => getOneCategories(categorySelected),
    queryKey: [categorySelected],
    refetchOnWindowFocus: false,
  })
  const { mutate, isPending: loadUpdate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories', data?.parentId || ''],
      })
      queryClient.invalidateQueries({ queryKey: [categorySelected] })
    },
  })

  const defaultValues = {
    name: '',
    description: '',
    keywords: '',
    image: undefined,
    parent: categorySelected,
  }

  const { handleSubmit, control, reset, setValue } = useForm<newCategoryForm>({
    resolver: zodResolver(ZNewCategoryForm),
    defaultValues,
  })

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || '',
        description: data.description || '',
        keywords: data.keywords || '',
        image: data.media?.id || undefined,
      })

      if (data.media) {
        const { media } = data
        seNewImageValue([
          {
            name: media.title,
            imgURI: media.qualities ? media.qualities[1].src : media.url,
            id: media.id,
            urlMedia: media.url,
          },
        ])
      } else {
        seNewImageValue(undefined)
      }
    }
  }, [data, reset])

  useEffect(() => {
    setValue('image', newImageValue ? newImageValue[0].id : undefined)
  }, [categorySelected, newImageValue, setValue])

  const submitForm = (form: newCategoryForm) => {
    mutate({ formData: form, id: categorySelected })
  }
  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        {isPending && (
          <Progress size="sm" isIndeterminate aria-label="Loading..." />
        )}
      </div>

      <div className="flex gap-2 items-center mb-5">
        <p className=" font-semibold">{category}</p>
        <div>
          {isPending && (
            <div className=" animate-spin">
              <Spinner fill="#777" size={20} />
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex justify-center  flex-col gap-y-5">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                required
                placeholder="Nombre de la categoría"
                label="Nombre"
                autoComplete="off"
                labelPlacement="outside"
                variant="bordered"
                size="md"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Descripción de la categoría"
                label="Descripción (opcional)"
                labelPlacement="outside"
                variant="bordered"
                size="md"
              />
            )}
          />
          <Controller
            control={control}
            name="keywords"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Keywords"
                label="Keywords (opcional)"
                labelPlacement="outside"
                autoComplete="off"
                variant="bordered"
                size="md"
              />
            )}
          />
          <AdvancedSettings
            parent={data?.parentId || ''}
            categoryID={categorySelected}
            onSelectCategory={onCloseCategory}
          />
          <div className="max-w-60">
            <p className="text-sm pb-3">Imagen (opcional)</p>
            <SelectImage
              iconSize={100}
              defaultMedias={newImageValue}
              setValue={seNewImageValue}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Button
              color="primary"
              className={
                isPending || loadUpdate ? ' cursor-not-allowed' : ' font-medium'
              }
              type="submit"
              disabled={isPending || loadUpdate}
            >
              {loadUpdate ? (
                <div className=" animate-spin">
                  <Spinner size={24} fill="#fff" />
                </div>
              ) : (
                'Actualizar'
              )}
            </Button>
          </div>
        </div>
      </form>
      <Toaster theme="dark" richColors />
    </>
  )
}
