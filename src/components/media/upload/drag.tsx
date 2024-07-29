import { useMutation } from '@tanstack/react-query'
import DragFiles from '@/components/media/upload/dragFIles'
import { SetStateAction, useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosClient'
import ContentImages from '../contentImages'
import style from './style.module.css'
import { MediaSchema } from '@/types/schemas'
import { TSelectMedia } from '../index'
import { IUploads } from '@/types'
import SkeletonImage from '../skeletonImage'

interface IMutation {
  formFile: FormData
  index: number
}
interface IProps extends TSelectMedia {
  children?: React.ReactNode
  dataMedia: IUploads[] | null
  mediaSelect: IUploads[] | undefined
  setMediasSelect: React.Dispatch<SetStateAction<IUploads[] | undefined>>
}
export default function DragMedia({
  select,
  dataMedia,
  mediaSelect,
  setMediasSelect,
}: IProps) {
  const [dragOver, setDragOver] = useState(false)
  const [upload, setUpload] = useState<IUploads[] | null>(dataMedia)
  const [totalUp, setTotalUp] = useState(0)

  useEffect(() => {
    if (totalUp < 1 && dataMedia !== upload) {
      setUpload(dataMedia)
    }
  }, [dataMedia])

  const { mutate } = useMutation({
    mutationFn: async ({ formFile, index }: IMutation) => {
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
          const mediaImage = res.data.images
            ? res.data.images[2].src
            : res.data.url
          const urlImage = res.data.images
            ? res.data.images[6].src
            : res.data.url
          const newUploads = [...prevUpload]
          newUploads[res.index] = {
            mediaIDItem: res.data._id,
            id: res.data.mediaId,
            urlMedia: urlImage,
            imgURI: mediaImage,
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
    let isImage = true
    Array.from(files).map((file, i) => {
      if (file.type.startsWith('image/') === false) {
        isImage = false
        return
      }
    })
    if (hasFiles && isImage) {
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
            })
            resolve({
              imgURI,
              name,
              progress: 1,
              id,
              mediaIDItem: '#',
              urlMedia: '#',
            })
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
      // className="min-h-screen"
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
          ? upload.map((e) => {
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
                    url={e.urlMedia}
                    name={e.name}
                    load={e.progress}
                    selectItem={setMediasSelect}
                  />
                )
              }
            })
          : Array.from({ length: 30 }).map((_, i) => <SkeletonImage key={i} />)}
      </div>
    </div>
  )
}
