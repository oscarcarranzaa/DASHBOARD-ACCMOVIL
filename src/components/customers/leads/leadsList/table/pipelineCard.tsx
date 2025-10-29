'use client'

import { changeStage } from '@/api/crm'
import SimplePipelineStages from '@/components/customers/crm/pipeline/pipelineStage/simple'
import PipelineSVG from '@/components/icons/pipeline'
import { allLeadShema, getOneLeadShema } from '@/types/crm/leads'
import { pipelineSchema } from '@/types/crm/pipeline'
import { contactSchema } from '@/types/customer'
import { addToast } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleDollarSign, Flag, User } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type TProps = {
  leadId: string
  leadStatus: getOneLeadShema['status']
  description: string
  stageId?: string | null
  value?: number | null
  pipeline?: pipelineSchema
  contact?: contactSchema | null
  leadVisibility: getOneLeadShema['visibility']
  expectedClosed?: string | null
}
export default function PipelineCard({
  leadId,
  description,
  value,
  leadStatus,
  stageId,
  pipeline,
  contact,
  leadVisibility,
  expectedClosed,
}: TProps) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('leadPage')) || 1
  const funnelId = searchParams.get('id')
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: changeStage,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['leads'] })
      const previousLeads = queryClient.getQueryData([
        'leads',
        currentPage.toString(),
        funnelId,
      ])
      queryClient.setQueryData(
        ['leads', currentPage.toString(), funnelId],
        (oldLead: allLeadShema) => {
          if (!oldLead) return oldLead
          return {
            ...oldLead,
            data: oldLead.data.map((lead) =>
              lead.id === newData.lead_id
                ? { ...lead, stageId: newData.new_stage_id }
                : lead
            ),
          }
        }
      )
      return { previousLeads }
    },
    onError: (_err, _newData, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(
          ['leads', currentPage.toString(), funnelId],
          context.previousLeads
        )
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
        queryKey: ['leads', currentPage.toString(), funnelId],
      })
    },
  })

  return (
    <>
      <div className=" p-3 flex flex-col gap-y-3">
        <div className="flex  gap-3 max-w-96 min-w-80">
          <div className="flex-none mt-1 opacity-70">
            <CircleDollarSign size={18} />
          </div>
          <div>
            <p className="font-medium line-clamp-1" title={description}>
              {description}
            </p>
            {value && <p className="opacity-70 text-xs">HNL {value}</p>}
          </div>
        </div>
        <div className="flex gap-3  max-w-80">
          <div className="flex-none opacity-70">
            <User size={18} />
          </div>
          <div>
            <p className="text-sm line-clamp-1 opacity-90">
              {contact ? contact.name : 'Contacto eliminado'}
            </p>
          </div>
        </div>
        {expectedClosed && (
          <div
            className="flex gap-3  max-w-80"
            title="Fecha prevista de cierre"
          >
            <div className="flex-none opacity-70">
              <Flag size={18} />
            </div>
            <div>
              <p className="text-sm line-clamp-1 opacity-90">
                {expectedClosed}
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-4  max-w-80 mt-4">
          <div className="flex-none stroke-[#444] dark:stroke-[#999]">
            <PipelineSVG size={18} />
          </div>
          <div className="w-full">
            <SimplePipelineStages
              leadStatus={leadStatus}
              isLoading={isPending}
              leadVisibility={leadVisibility}
              currentStage={stageId}
              pipeline={pipeline}
              onChange={(newStageId) => {
                mutate({ new_stage_id: newStageId, lead_id: leadId })
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
