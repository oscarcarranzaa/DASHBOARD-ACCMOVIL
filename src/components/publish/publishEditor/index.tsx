'use client'
import { Input } from '@nextui-org/react'
import dynamic from 'next/dynamic'

export default function PublishEditor() {
  const EditorText = dynamic(() => import('@/components/EditorText/'), {
    ssr: false,
    loading: () => <p>Cargando....</p>,
  })
  return (
    <>
      <div className="grid grid-cols-12">
        <div className=" col-span-8">
          <Input variant="bordered" isRequired label="Titulo" />
        </div>
        <div></div>
      </div>
      <div className="mt-10 p-3">
        <EditorText />
      </div>
    </>
  )
}
