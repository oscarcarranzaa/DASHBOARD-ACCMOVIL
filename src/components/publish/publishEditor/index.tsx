'use client'
import { Input } from '@nextui-org/react'

export default function PublishEditor() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className=" col-span-8">
          <Input variant="bordered" isRequired label="Titulo" />
        </div>
        <div></div>
      </div>
    </>
  )
}
