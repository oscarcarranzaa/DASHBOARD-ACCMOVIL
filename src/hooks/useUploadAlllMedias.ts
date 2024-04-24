import axiosInstance from '@/lib/axiosClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const useUploadAllMedia = () => {
  const [load, setLoad] = useState(0)

  const upload = (formFile: FormData) => {
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
  }
  return { load, upload }
}
export default useUploadAllMedia
