import { newCategory } from '@/api/category'
import Spinner from '@/components/icons/spinner'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newCategoryForm, ZNewCategoryForm } from '@/types/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea } from '@nextui-org/react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'

type TProps = {
  categorySelected?: string | undefined
  category: string
  parentCategory: string
}
export default function NewCategoryForm({
  category,
  categorySelected,
  parentCategory,
}: TProps) {
  const [newImageValue, seNewImageValue] = useState<IUploads[]>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<newCategoryForm>({
    resolver: zodResolver(ZNewCategoryForm),
  })

  const { data, isPending, mutate, isError } = useMutation({
    mutationFn: newCategory,
    onSuccess: (dat) => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
      seNewImageValue(undefined)
      reset()
      toast.success('Nueva categoría creada.')
      setValue('parent', categorySelected)
    },
    onError: (err) => {
      setErrorMessage(err.message)
    },
  })

  useEffect(() => {
    setValue('parent', categorySelected)
    setValue('image', newImageValue ? newImageValue[0].id : undefined)
  }, [categorySelected, newImageValue, setValue])

  const handleForm = (formData: newCategoryForm) => {
    mutate(formData)
  }
  return (
    <>
      <div className="mt-5">
        <form onSubmit={handleSubmit(handleForm)}>
          <p className=" font-semibold mb-5">{category}</p>
          <div className="flex justify-center  flex-col gap-y-5">
            <Input
              {...register('name', {
                required: 'El nombre es obligatorio',
              })}
              isRequired
              placeholder="Nombre de la categoría"
              label="Nombre"
              autoComplete="off"
              labelPlacement="outside"
              variant="bordered"
              size="md"
              isInvalid={errors.name !== undefined}
              errorMessage={errors.name?.message ?? ''}
              name="name"
            />
            <Textarea
              {...register('description')}
              placeholder="Descripción de la categoría"
              label="Descripción (opcional)"
              labelPlacement="outside"
              variant="bordered"
              size="md"
              name="description"
            />
            <Input
              {...register('keywords')}
              placeholder="Keywords"
              label="Keywords (opcional)"
              labelPlacement="outside"
              autoComplete="off"
              variant="bordered"
              size="md"
              name="keywords"
            />
            <div className="max-w-60">
              <p className="text-sm pb-3">Imagen (opcional)</p>
              <SelectImage
                iconSize={100}
                setValue={seNewImageValue}
                defaultMedias={newImageValue}
              />
            </div>
            <Button
              color="primary"
              type="submit"
              disabled={isPending}
              className=" font-medium"
            >
              {isPending ? (
                <div className=" animate-spin">
                  <Spinner size={24} fill="#fff" />
                </div>
              ) : (
                'Añadir'
              )}
            </Button>

            {isError && (
              <div className="h-5">
                <p className="text-xs font-semibold text-red-500">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
      <Toaster theme="dark" richColors />
    </>
  )
}
