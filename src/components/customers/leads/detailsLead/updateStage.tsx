'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeStage } from '@/api/crm'
import { addToast } from '@heroui/react'
import { getOneLeadShema, leadSchema } from '@/types/crm/leads'
import DetailedPipelineStages from '../../crm/pipeline/pipelineStage/detailed'

type TProps = {
  lead: getOneLeadShema
}

export default function UpdateStage({ lead }: TProps) {
  const leadId = lead.id
  const leadQueryKey = ['oneLead', lead.id]

  const queryClient = useQueryClient()

  const { mutate, isPending: pendingSetStage } = useMutation({
    mutationFn: changeStage,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['oneLead'] })
      const previousLeads = queryClient.getQueryData(leadQueryKey)
      queryClient.setQueryData(leadQueryKey, (oldLead: getOneLeadShema) => {
        if (!oldLead) return oldLead
        return {
          ...oldLead,
          stageId: newData.new_stage_id,
        }
      })
      return { previousLeads }
    },
    onError: (_err, _newData, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(leadQueryKey, context.previousLeads)
      }
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: _err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: leadQueryKey,
        leadId,
      })
      queryClient.invalidateQueries({
        queryKey: [leadId, 'history'],
        leadId,
      })
    },
  })

  const handleSetStage = (newStage: string) => {
    mutate({ new_stage_id: newStage, lead_id: leadId })
  }
  return (
    <DetailedPipelineStages
      isLoading={pendingSetStage}
      pipeline={lead.pipeline}
      currentStage={lead.stageId}
      onChange={handleSetStage}
    />
  )
}
