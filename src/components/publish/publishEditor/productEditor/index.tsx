'use client'

import SelectImage from '@/components/media/selectImage'

import ProductModalEditor from './productModal'
import { Input } from '@nextui-org/react'

type TProps = {
  name?: string
}
export default function ProductEditor({ name }: TProps) {
  return (
    <>
      <div className="grid grid-cols-2 justify-between items-center max-w-3xl w-full bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
        <div className="flex p-1">
          <div className=" w-14 flex-none">
            <SelectImage select="only" iconSize={32} setValue={(val) => {}} />
          </div>
          <ProductModalEditor title={name}>
            <div className="w-full flex items-center h-full">
              <p className="w-full ml-3 text-xs">{name}</p>
            </div>
          </ProductModalEditor>
        </div>
        <div className=" flex gap-3 ">
          <Input
            variant="bordered"
            size="sm"
            placeholder="0.00"
            startContent={<p>L</p>}
            label="Precio"
            labelPlacement="outside"
          />
          <Input
            variant="bordered"
            size="sm"
            placeholder="0.00"
            startContent={<p>L</p>}
            label="Precio descuento"
            labelPlacement="outside"
          />
        </div>
      </div>
    </>
  )
}
