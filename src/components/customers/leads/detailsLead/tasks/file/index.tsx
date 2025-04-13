'use client'

import { useDroppable } from '@dnd-kit/core'
import { useCallback, useRef, useState } from 'react'
import { Download, UploadCloud } from 'lucide-react'
import FileItemUpload from './fileItemUpload'

export default function LeadUploadFileTask({
  onFileDrop,
}: {
  onFileDrop: (files: FileList) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOver, setIsOver] = useState(false)

  const { setNodeRef } = useDroppable({
    id: 'file-dropzone',
  })

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileDrop(e.target.files)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOver(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      onFileDrop(files)
    }
  }

  return (
    <>
      <div className="w-full">
        <div
          ref={setNodeRef}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
        >
          {isOver ? (
            <Download className="mx-auto mb-2 text-gray-500" size={40} />
          ) : (
            <UploadCloud className="mx-auto mb-2 text-gray-500" size={40} />
          )}
          <p className="text-gray-500">
            {isOver
              ? 'Suelta los archivos aquí'
              : 'Arrastra tus archivos aquí o haz clic para subir, Max (100 MB)'}
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  )
}
