import { useMutation, useQueryClient } from '@tanstack/react-query'
import DragFiles from '@/components/media/upload/dragFIles'
import { useState } from 'react'
import axiosInstance from '@/lib/axiosClient'
import ContentImages from '../contentImages'
import style from './style.module.css'

interface IProps {
  children: React.ReactNode
}
interface IMutation {
  formFile: FormData
  index: number
  blob: string
  name: string
  id: string
}
interface IUploads {
  imgURI: string
  name: string
  progress: number
  id: string
}
export default function DragMedia({ children }: IProps) {
  const [dragOver, setDragOver] = useState(false)
  const [upload, setUpload] = useState<IUploads[] | null>(null)
  const queryClient = useQueryClient()

  const {
    mutate,
    data: mediaData,
    isPending: mediaPending,
  } = useMutation({
    mutationFn: async ({ formFile, index, blob, name, id }: IMutation) => {
      const { data } = await axiosInstance.post(`/media/upload`, formFile, {
        onUploadProgress(progressEvent) {
          if (progressEvent.total) {
            const progress =
              Math.round((progressEvent.loaded / progressEvent.total) * 100) ??
              0
            console.log(progress)
            handleProgress(progress, index)
          }
        },
      })
      return data
    },
    onSuccess: async () => {
      // await queryClient.invalidateQueries({ queryKey: ['medias'] })
      // setUpload(null)
      console.log('succes')
    },
  })
  const handleProgress = (progress: number, index: number) => {
    setUpload((prevUpload) => {
      if (prevUpload && prevUpload !== null) {
        const newUploads = [...prevUpload]
        newUploads[index].progress = progress
        console.log(newUploads)
        return newUploads
      } else {
        return null
      }
    })
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const hasFiles = Array.from(e.dataTransfer.types).includes('Files')
    const files = e.dataTransfer.files
    if (hasFiles) {
      uploadFile(files).then((results) => {
        const upValue = !upload ? results : results.concat(upload)
        setUpload(upValue)
      })
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
    return Promise.all<IUploads>(
      Array.from(files).map((file, i) => {
        const indexData = upload ? upload.length + i + 1 : i
        return new Promise((resolve) => {
          const formData = new FormData()
          const { type, name } = file
          formData.append('file', new File([file], name, { type: type }))

          const reader = new FileReader()
          const id = 'cargando' + indexData
          reader.onload = () => {
            const imgURI = reader.result as string
            mutate({
              formFile: formData,
              index: i,
              blob: imgURI,
              name: name,
              id: id,
            })
            resolve({ imgURI, name, progress: 0, id })
          }
          reader.readAsDataURL(file)
        })
      })
    )
  }

  // Llamada a la función uploadFile
  console.log(upload)
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

      <div className={style.mediaContent}>
        {upload
          ? upload.map((e, index) => {
              return (
                <ContentImages
                  key={e.name}
                  image={e.imgURI}
                  url={e.imgURI}
                  name={e.name}
                  load={e.progress}
                />
              )
            })
          : null}

        {children}
      </div>
    </div>
  )
}
