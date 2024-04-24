import { uploadMedia } from '@/api/media'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import DragFiles from '@/components/media/upload/dragFIles'
import { useState } from 'react'

interface IProps {
  children: React.ReactNode
}
export default function DragMedia({ children }: IProps) {
  const [dragOver, setDragOver] = useState(false)
  const queryClient = useQueryClient()
  const {
    mutate,
    data: mediaData,
    isPending: mediaPending,
  } = useMutation({
    mutationFn: uploadMedia,
    onSuccess: async () => {
      const q = await queryClient.invalidateQueries({ queryKey: ['medias'] })
      console.log(q)
      console.log('succes')
    },
  })

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const hasFiles = Array.from(e.dataTransfer.types).includes('Files')
    const files = e.dataTransfer.files
    if (hasFiles) {
      uploadFile(files)
    }
    setDragOver(false)
    e.preventDefault()
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const hasFiles = Array.from(e.dataTransfer.types).includes('Files')
    setDragOver(hasFiles)
    e.preventDefault()
  }
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }
  // Subir los archivos
  const uploadFile = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      const file = files[i]
      console.log(file, i)
      const { type } = files[i]
      console.log(type)
      formData.append('file', new File([file], file.name, { type: type }))
      mutate(formData)
    }
  }
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="min-h-screen"
    >
      <div
        onDragLeave={handleDragLeave}
        className={
          dragOver ? 'fixed top-0 left-0 w-full h-screen z-50' : 'hidden'
        }
      >
        <DragFiles />
      </div>
      {children}
    </div>
  )
}
