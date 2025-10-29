'use client'
import { addPipeline } from '@/api/crm'
import PipelineEditor from '@/components/customers/crm/pipeline/editor'
import NavegationPages from '@/components/navegationPages'
import { addToast } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function AddPipeline() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: addPipeline,
    onSuccess: (succ) => {
      queryClient.invalidateQueries({ queryKey: ['pipelines'] })
      addToast({
        title: 'Nuevo embudo creado',
        color: 'success',
        timeout: 5000,
        variant: 'bordered',
      })
      router.push('/dash/embudo')
    },
    onError: (err) => {
      addToast({
        title: 'Ocurrió un error',
        color: 'danger',
        description: err.message,
        timeout: 5000,
        variant: 'bordered',
      })
    },
  })
  return (
    <>
      <NavegationPages text="Nuevo embudo" />
      <PipelineEditor
        isPending={isPending}
        onSendData={(data) => {
          mutate(data)
          console.log(data)
        }}
      />
    </>
  )
}
