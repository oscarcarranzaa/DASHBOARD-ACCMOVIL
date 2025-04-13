'use client'

import { addToast, Tab, Tabs } from '@heroui/react'
import LeadNotes from './notes'
import LeadUploadFileTask from './file'
import { File, NotebookPen } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosClient'
import FileItemUpload from './file/fileItemUpload'

type TFileProgress = {
  name: string
  progress: number
  type: string
  size: number
  isError: boolean
  id: number
  file: File
}
export default function LeadTasksInput() {
  const [fileProgress, setFileProgress] = useState<TFileProgress[]>([])
  const [controllers, setControllers] = useState<Map<number, AbortController>>(
    new Map()
  )

  const params = useParams()
  const leadId = params.leadID as string
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async ({ file, index }: { file: File; index: number }) => {
      const formData = new FormData()
      formData.append('file', file)

      const controller = new AbortController()
      setControllers((prev) => new Map(prev).set(index, controller))

      const response = await axiosInstance.post(
        `admin/lead/${leadId}/file`,
        formData,
        {
          signal: controller.signal,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total)
              handleProgress(percent, index, false)
            }
          },
        }
      )

      return { index }
    },
    onError: (err, fileData) => {
      handleProgress(0, fileData.index, true)
    },
    onSettled: (result) => {
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
    },
    onSuccess: (result) => {
      if (result) {
        handleProgress(101, result.index, false)
      }
    },
  })

  const handleProgress = (
    progress: number,
    index: number,
    isError: boolean
  ) => {
    setFileProgress((prev) =>
      prev.map((item) =>
        item.id === index ? { ...item, isError, progress } : item
      )
    )
  }
  const handleUpload = (files: FileList) => {
    const totalFiles = files.length
    if (totalFiles > 10 || fileProgress.length > 10) {
      addToast({
        title: 'Error al subir archivos.',
        description: 'Límite de subida simultánea superan a los 10 archivos.',
        variant: 'bordered',
        color: 'danger',
        timeout: 5000,
      })
      return
    }
    const maxFileSize = 100 * 1024 * 1024
    Array.from(files).map((fileData, index) => {
      if (fileData.size > maxFileSize) {
        addToast({
          title: 'Archivo demasiado grande.',
          description: `"${fileData.name}" excede el límite de 100MB.`,
          variant: 'bordered',
          color: 'danger',
          timeout: 5000,
        })
        return
      }
      const indexData = fileProgress.length + index
      const { name, type, size } = fileData
      const newFileProgress = {
        id: indexData,
        name,
        type,
        size,
        isError: false,
        progress: 0,
        file: fileData,
      }
      setFileProgress((prev) => [...prev, newFileProgress])
      mutate({ file: fileData, index: indexData })
    })
  }
  const handleRetry = (key: number) => {
    const findFileUpload = fileProgress.find((f) => f.id === key)
    if (findFileUpload) {
      setFileProgress((prev) =>
        prev.map((item) =>
          item.id === key ? { ...item, isError: true, progress: 0 } : item
        )
      )
      mutate({ file: findFileUpload.file, index: findFileUpload.id })
    }
  }

  const handleCancel = (key: number) => {
    const controller = controllers.get(key)
    controller?.abort()

    setFileProgress((prev) => prev.filter((item) => item.id !== key))

    setControllers((prev) => {
      const newMap = new Map(prev)
      newMap.delete(key)
      return newMap
    })
  }

  return (
    <>
      <div className="dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 bg-zinc-100  p-2 rounded-xl">
        <Tabs variant="bordered" radius="sm">
          <Tab
            title={
              <div className="flex items-center space-x-2">
                <NotebookPen size={18} />
                <span>Notas</span>
              </div>
            }
          >
            <LeadNotes leadId={leadId} />
          </Tab>
          <Tab
            title={
              <div className="flex items-center space-x-2">
                <File size={18} />
                <span>Archivos</span>
              </div>
            }
          >
            <LeadUploadFileTask onFileDrop={(file) => handleUpload(file)} />
            <div className="mt-3 flex flex-wrap gap-2">
              {fileProgress.map((data) => {
                return (
                  <FileItemUpload
                    id={data.id}
                    isError={data.isError}
                    key={data.id}
                    onRetry={handleRetry}
                    size={data.size}
                    progress={data.progress}
                    name={data.name}
                    mimeType={data.type.split('/')[1]}
                    onCancel={handleCancel}
                  />
                )
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
