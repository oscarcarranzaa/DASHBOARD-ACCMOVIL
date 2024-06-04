'use client'
import TextEditor from '@/components/textEditor'
import { Input } from '@nextui-org/react'

export default function PublishEditor() {
  return (
    <>
      <div className="grid grid-cols-12 mt-10">
        <div className=" col-span-8">
          <Input variant="bordered" isRequired label="Titulo" />
          <div className="mt-10">
            <p className="text-sm mb-1">Descripción</p>
            <TextEditor />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
