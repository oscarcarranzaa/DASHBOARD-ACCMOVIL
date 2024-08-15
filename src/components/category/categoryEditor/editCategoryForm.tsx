import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newCategoryForm } from '@/types/category'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

type TProps = {
  category: string
  register: UseFormRegister<newCategoryForm>
}
export default function EditCategoryForm({ category, register }: TProps) {
  const [newImageValue, seNewImageValue] = useState<IUploads[]>()

  return (
    <>
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
