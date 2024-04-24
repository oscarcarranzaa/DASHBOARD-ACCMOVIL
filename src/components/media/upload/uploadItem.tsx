import axiosInstance from '@/lib/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface IMutation {
  formFile: FormData
}
export default function UploadItem({ formFile }: IMutation) {
  const [load, setLoad] = useState(0)

  useEffect(() => {
    axiosInstance.post(`/media/upload`, formFile, {
      onUploadProgress(progressEvent) {
        if (progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          )
          setLoad(progress)
        }
      },
    })
  }, [formFile])
  return (
    <>
      <p>Hola</p>
    </>
  )
}
