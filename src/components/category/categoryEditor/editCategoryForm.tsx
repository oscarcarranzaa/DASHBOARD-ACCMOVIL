import { getOneCategories } from '@/api/category'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newCategoryForm, ZNewCategoryForm } from '@/types/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Progress, Textarea } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type TProps = {
  category: string
  categorySelected: string
}
export default function EditCategoryForm({
  category,
  categorySelected,
}: TProps) {
  const [newImageValue, seNewImageValue] = useState<IUploads[]>()

  const { data, isPending } = useQuery({
    queryFn: () => getOneCategories(categorySelected),
    queryKey: [category],
  })

  const { register, handleSubmit, setValue, reset, getValues } =
    useForm<newCategoryForm>({
      resolver: zodResolver(ZNewCategoryForm),
    })
  useEffect(() => {
    if (data) {
      setValue('name', data.name)
      setValue('description', data.description)
      setValue('keywords', data.keywords)
      setValue('image', data.image?._id)
    }
  }, [data, setValue])
  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        {isPending && (
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
          />
        )}
      </div>

      <p className=" font-semibold mb-5">{category}</p>
      <div className="flex justify-center  flex-col gap-y-5">
        <input
          {...register('name', {
            required: 'El nombre es obligatorio',
          })}
        />
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
          <input
            type="hidden"
            {...register('image')}
            value={newImageValue ? newImageValue[0].mediaIDItem : undefined}
            name="image"
          />
          <SelectImage iconSize={100} setValue={seNewImageValue} />
        </div>
        <Button color="primary" type="submit">
          Agregar
        </Button>
      </div>
    </>
  )
}
