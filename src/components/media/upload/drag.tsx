import { useMutation } from '@tanstack/react-query'
import DragFiles from '@/components/media/upload/dragFIles'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import axiosInstance from '@/lib/axiosClient'
import ContentImages from '../contentImages'
import style from './style.module.css'
import { MediaSchema } from '@/types/schemas'
import { TSelectMedia } from '../index'
import { IUploads } from '@/types'
import SkeletonImage from '../skeletonImage'
import PaginationPage from '@/components/UI/pagination'
import EmptyMedia from './emptyMedias'
import useGetMedia from '@/hooks/useGetMedias'
import Search from '@/components/UI/search'
import { Button } from '@heroui/react'
import PlusSVG from '@/components/icons/plus'
import UploadSVG from '@/components/icons/upload'
interface IMutation {
  formFile: FormData
  index: number
}
interface IProps extends TSelectMedia {
  children?: React.ReactNode
  mediaSelect?: IUploads[]
  setMediasSelect?: React.Dispatch<SetStateAction<IUploads[] | undefined>>
}
export default function DragMedia({
  select,
  mediaSelect,
  setMediasSelect,
}: IProps) {
  const [dragOver, setDragOver] = useState(false)
  const [upload, setUpload] = useState<IUploads[] | null>(null)
  const [totalPageDefine, setTotalPageDefine] = useState(0)
  const { data: dataMedia, totalPages } = useGetMedia()

  useEffect(() => {
    if (totalPages) {
      setTotalPageDefine(totalPages)
    }
  }, [totalPages])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const { mutate } = useMutation({
    mutationFn: async ({ formFile, index }: IMutation) => {
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
          const mediaImage = res.data.qualities
            ? res.data.qualities[2].src
            : res.data.url
          const urlImage = res.data.qualities
            ? res.data.qualities[6].src
            : res.data.url
          const newUploads = [...prevUpload]
          newUploads[res.index] = {
            id: res.data.id,
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.files) {
      const files = event.target.files
      let isImage = true
      Array.from(files).map((file, i) => {
        if (file.type.startsWith('image/') === false) {
          isImage = false
          return
        }
      })
      if (isImage) {
        uploadFile(files).then((results) => {
          const upValue = !upload ? results : results.concat(upload)
          setUpload(upValue)
        })
      }
    }
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
              urlMedia: '#',
            })
          }
          reader.readAsDataURL(file)
        })
      })
    )
  }
  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {dataMedia?.length === 0 && !upload ? <EmptyMedia /> : null}
      <div
        onDragLeave={handleDragLeave}
        className={
          dragOver ? 'fixed top-0 left-0 w-full h-screen z-50' : 'hidden'
        }
      >
        <DragFiles />
      </div>
      <div className=" flex justify-between dark:fill-white px-3 mb-3 pt-2">
        <Search
          searchName="searchMedia"
          pageName="pageMedia"
          placeHolder="Buscar medio..."
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          color="primary"
          className="w-40 rounded fill-white"
          onPress={handleButtonClick}
        >
          <UploadSVG size={24} /> Cargar
        </Button>
      </div>
      <div className={style.mediaContent}>
        {upload?.map((e) => {
          const checkSelect = mediaSelect?.find((s) => s.id == e.id)
            ? true
            : false

          if (e.imgURI) {
            return (
              <ContentImages
                isNew
                check={checkSelect}
                id={e.id}
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
        })}
        {dataMedia
          ? dataMedia.map((e) => {
              const checkSelect = mediaSelect?.find((s) => s.id == e.id)
                ? true
                : false
              const isExists = upload?.find((up) => up.id === e.id)
              if (isExists) return
              if (e.imgURI) {
                return (
                  <ContentImages
                    check={checkSelect}
                    id={e.id}
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
          : Array.from({ length: 50 }).map((_, i) => <SkeletonImage key={i} />)}
      </div>
      <div className="mt-10 flex justify-center mb-20">
        {totalPageDefine > 0 && (
          <PaginationPage totalPages={totalPageDefine} pageName="pageMedia" />
        )}
      </div>
    </div>
  )
}
