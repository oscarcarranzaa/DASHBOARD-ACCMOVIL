import { newCategory } from '@/api/category'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newCategoryForm, ZNewCategoryForm } from '@/types/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type TProps = {
  categorySelected?: string | undefined
  category: string
}
export default function NewCategoryForm({
  category,
  categorySelected,
}: TProps) {
  const [newImageValue, seNewImageValue] = useState<IUploads[]>()
  const { data, mutate } = useMutation({
    mutationFn: newCategory,
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const { register, handleSubmit, setValue, unregister, getValues } =
    useForm<newCategoryForm>({
      resolver: zodResolver(ZNewCategoryForm),
    })

  useEffect(() => {
    setValue('parent', categorySelected)
    setValue('image', newImageValue ? newImageValue[0].mediaIDItem : undefined)
  }, [categorySelected, newImageValue, setValue])

  const handleForm = (formData: newCategoryForm) => {
    console.log(formData, 'hello')
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
              required
              placeholder="Nombre de la categoría"
              label="Nombre"
              autoComplete="off"
              labelPlacement="outside"
              variant="bordered"
              size="md"
              name="name"
            />
            <Textarea
              {...register('description')}
              placeholder="Descripción de la categoría"
              label="Descripción"
              labelPlacement="outside"
              variant="bordered"
              size="md"
              name="description"
            />
            <Input
              {...register('keywords')}
              placeholder="Keywords"
              label="Keywords"
              labelPlacement="outside"
              autoComplete="off"
              variant="bordered"
              size="md"
              name="keywords"
            />
            <div className="max-w-60">
              <p className="text-sm pb-3">Imagen </p>
              <SelectImage iconSize={100} setValue={seNewImageValue} />
            </div>
            <Button color="primary" type="submit">
              Añadir
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
