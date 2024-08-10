import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useState } from 'react'

export default function CategoryForm() {
  const [newImageValue, seNewImageValue] = useState<IUploads[]>()
  return (
    <div className="flex justify-center  flex-col gap-y-5">
      <Input
        isRequired
        placeholder="Nombre de la categoría"
        label="Nombre"
        autoComplete="off"
        labelPlacement="outside"
        variant="bordered"
        size="md"
      />
      <Textarea
        placeholder="Descripción de la categoría"
        label="Descripción"
        labelPlacement="outside"
        variant="bordered"
        size="md"
      />
      <Input
        placeholder="Keywords"
        label="Keywords"
        labelPlacement="outside"
        autoComplete="off"
        variant="bordered"
        size="md"
      />
      <div className="max-w-60">
        <p className="text-sm pb-3">Imagen </p>
        <SelectImage iconSize={100} setValue={seNewImageValue} />
      </div>
      <Button color="primary">Agregar</Button>
    </div>
  )
}
