'use client'
import { getOnePipeline, updateOnePipeline } from '@/api/crm'
import PipelineEditor from '@/components/customers/crm/pipeline/editor'
import NavegationPages from '@/components/navegationPages'
import { addToast } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'

export default function EditFunnelPage() {
  const searchParams = useParams<{ funnel: string }>()
  const funnel = searchParams.funnel

  const queryClient = useQueryClient()
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['pipeline', funnel],
    queryFn: () => getOnePipeline({ id: funnel }),
  })

  const { mutate: updatePipeline, isPending: isPendingUpdatePipeline } =
    useMutation({
      mutationFn: updateOnePipeline,
      onSuccess: (success) => {
        addToast({
          title: 'Embudo actualizado',
          variant: 'bordered',
          color: 'success',
          description: 'El embudo se actualizó correctamente',
        })
        router.push(`/dash/embudo/${funnel}`)
      },
      onError: (error) => {
        addToast({
          title: 'Error al actualizar el embudo',
          variant: 'bordered',
          color: 'danger',
          description: error.message,
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['pipeline', funnel],
        })
        queryClient.invalidateQueries({
          queryKey: ['leads'],
        })
        queryClient.invalidateQueries({
          queryKey: ['oneLead'],
        })
      },
    })

  const pipeline = data && {
    ...data,
    stages: data.stages.map((st) => {
      return {
        ...st,
        stage_id: st.id,
        active: true,
        is_new: false,
        delete_leads: false,
        move_leads_to_stage_id: undefined,
      }
    }),
  }
  return (
    <>
      <NavegationPages text="Editar embudo" />
      {pipeline && (
        <PipelineEditor
          isPending={isPendingUpdatePipeline}
          defaultValues={pipeline}
          onSendData={(data) => updatePipeline({ id: funnel, pipeline: data })}
        />
      )}
    </>
  )
}
