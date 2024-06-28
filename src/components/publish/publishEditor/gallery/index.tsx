import { useState } from 'react'
import SelecImageGallery from './selectImageGallery'
import { IUploads } from '@/types'

export default function Gallery() {
  const [gallery, setGallery] = useState<IUploads[] | undefined>()
  console.log(gallery)
  return (
    <>
      <div className="w-full min-h-24 flex justify-center items-center border border-zinc-500 rounded-xl dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors overflow-hidden p-2">
        <SelecImageGallery setValue={setGallery} />
      </div>
    </>
  )
}
