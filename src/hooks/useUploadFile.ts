import axiosInstance from '@/lib/axiosClient'
import { useMutation } from '@tanstack/react-query'
import { useState, useRef } from 'react'

export function useUploadFile() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)

      const controller = new AbortController()
      abortRef.current = controller

      const response = await axiosInstance.post('/upload/file', formData, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total)
            setUploadProgress(percent)
          }
        },
      })

      return response.data
    },
    onSettled: () => {
      abortRef.current = null
      setUploadProgress(0)
    },
  })

  const cancelUpload = () => {
    abortRef.current?.abort()
  }

  return {
    uploadFile: mutation.mutate,
    uploadProgress,
    isUploading: mutation.isPending,
    cancelUpload,
    ...mutation,
  }
}
