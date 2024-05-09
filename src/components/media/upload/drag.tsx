import { useMutation } from '@tanstack/react-query'
import DragFiles from '@/components/media/upload/dragFIles'
import { SetStateAction, useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosClient'
import ContentImages from '../contentImages'
import style from './style.module.css'
import { MediaSchema } from '@/types/schemas'
import { TSelectMedia } from '../index'
interface IMutation {
  formFile: FormData
  index: number
  blob: string
  name: string
  id: string
}
export interface IUploads {
  imgURI: string
  name: string
  progress?: number
  id: string
  mediaIDItem: string
}
interface IProps extends TSelectMedia {
  children?: React.ReactNode
  dataMedia: IUploads[] | null
  mediaSelect?: IUploads[] | null
  setMediasSelect?: React.Dispatch<SetStateAction<IUploads[] | []>>
}
export default function DragMedia({
  select,
  dataMedia,
  mediaSelect,
  setMediasSelect,
}: IProps) {
  const [dragOver, setDragOver] = useState(false)
  const [upload, setUpload] = useState<IUploads[] | null>(null)
  const [totalUp, setTotalUp] = useState(0)

  useEffect(() => {
    if (totalUp < 1) {
      setUpload(dataMedia)
    }
  }, [dataMedia])

  const {
    mutate,
    data: mediaData,
    isPending: mediaPending,
  } = useMutation({
    mutationFn: async ({ formFile, index, blob, name, id }: IMutation) => {
      setTotalUp((prev) => prev + 1)
      const { data } = await axiosInstance.post<MediaSchema>(
        `/media/upload`,
        formFile,
        {
          onUploadProgress(progressEvent) {
            if (progressEvent.total) {
              const progress =
                Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                ) ?? 0
              handleProgress(progress, index)
            }
          },
        }
      )
      return { data, index }
    },
    onSuccess: async (res) => {
      setUpload((prevUpload) => {
        if (prevUpload && prevUpload !== null) {
          const newUploads = [...prevUpload]
          newUploads[res.index] = {
            mediaIDItem: res.data.mediaId,
            id: res.data.mediaId,
            imgURI: res.data.url,
            name: res.data.title,
            progress: 101,
          }

          return newUploads
        }
        return null
      })
    },
  })
  const handleProgress = (progress: number, index: number) => {
    setUpload((prevUpload) => {
      if (prevUpload && prevUpload !== null && progress) {
        const newUploads = [...prevUpload]
        newUploads[index].progress = progress
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
            resolve({ imgURI, name, progress: 1, id, mediaIDItem: '#' })
          }
          reader.readAsDataURL(file)
        })
      })
    )
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

      <div className={style.mediaContent}>
        {upload
          ? upload.map((e, index) => {
              const checkSelect = mediaSelect?.find((s) => s.id == e.id)
                ? true
                : false
              if (e.imgURI) {
                return (
                  <ContentImages
                    check={checkSelect}
                    id={e.mediaIDItem}
                    mediaID={e.id}
                    isSelect={select}
                    key={e.id}
                    image={e.imgURI}
                    url={e.imgURI}
                    name={e.name}
                    load={e.progress}
                    selectItem={setMediasSelect}
                  />
                )
              }
            })
          : null}
      </div>
    </div>
  )
}
