import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

type TProps = {
  type: 'image' | 'colors' | 'option'
}
export default function FormTerms({ type }: TProps) {
  const [image, setImage] = useState<IUploads[]>()
  const [value, setValue] = useState<string>('color')

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }
  return (
    <>
      <p className="mb-3 text-lg font-semibold">Crear nuevo término</p>
      <div className="p-5 rounded-xl dark:bg-zinc-900 bg-white dark:border-zinc-600 border-zinc-300 border flex flex-col gap-5">
        <Input
          placeholder="Nombre del término"
          label="Nombre"
          variant="bordered"
          isRequired
          required
        />
        {type === 'option' && (
          <Input
            placeholder="Nombre de la opción"
            label="Opción"
            variant="bordered"
            isRequired
            required
          />
        )}
        <Input placeholder="Slug URL" label="Slug" variant="bordered" />
        {type === 'image' && (
          <div className="max-w-40">
            <p className="text-sm dark:text-zinc-300 text-zinc-600 mb-1">
              Imagen (obligatorio)
            </p>
            <SelectImage iconSize={100} setValue={setImage} />
          </div>
        )}
        {type === 'colors' && (
          <>
            <div>
              <p className="text-sm dark:text-zinc-300 text-zinc-600 pl-1 mb-1">
                Color
              </p>
              <Select onChange={handleSelectionChange} selectedKeys={[value]}>
                <SelectItem key="color">Color</SelectItem>
                <SelectItem key="bicolor">Bicolor</SelectItem>
              </Select>
              <div className="flex mt-5 gap-2">
                <Input type="color" className=" w-20 rounded-full" />
                {value === 'bicolor' && (
                  <Input type="color" className=" w-20 rounded-full" />
                )}
              </div>
            </div>
          </>
        )}
        <Button color="primary" className="w-full mt-5">
          Crear término
        </Button>
      </div>
    </>
  )
}
