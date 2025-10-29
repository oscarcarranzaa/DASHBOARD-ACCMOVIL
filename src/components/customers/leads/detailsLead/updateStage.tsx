'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeStage } from '@/api/crm'
import { addToast } from '@heroui/react'
import { getOneLeadShema } from '@/types/crm/leads'
import DetailedPipelineStages from '../../crm/pipeline/pipelineStage/detailed'
import { useSocket } from '@/hooks/useSocket'
import { useEffect } from 'react'
import { socket } from '@/lib/socket'

type TProps = {
  lead: getOneLeadShema
}

export default function UpdateStage({ lead }: TProps) {
  const leadId = lead.id
  const leadQueryKey = ['oneLead', lead.id]
  useSocket()

  useEffect(() => {
    socket.on('lead:stageChanged', (data) => {
      if (data.lead.id === leadId) {
        // Si es el lead correcto, actualiza el estado del lead con el nuevo stageId
        queryClient.setQueryData(leadQueryKey, (oldLead: getOneLeadShema) => {
          if (!oldLead) return oldLead

          return {
            ...oldLead,
            stageId: data.newStageId,
            leadStageHistory: data.lead?.leadStageHistory,
          }
        })
      }
    })

    return () => {
      socket.off('lead:stageChanged')
    }
  }, [leadId])

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
    onSuccess: async (success) => {
      queryClient.setQueryData(leadQueryKey, (oldLead: getOneLeadShema) => {
        if (!oldLead) return oldLead
        return success
      })
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
        queryKey: [leadId, 'history'],
      })
    },
  })

  const handleSetStage = (newStage: string) => {
    mutate({ new_stage_id: newStage, lead_id: leadId })
  }
  return (
    <>
      <DetailedPipelineStages
        leadStatus={lead.status}
        leadVisibility={lead.visibility}
        stageHistory={lead.leadStageHistory}
        isLoading={pendingSetStage}
        pipeline={lead.pipeline}
        currentStage={lead.stageId}
        onChange={handleSetStage}
      />
    </>
  )
}
