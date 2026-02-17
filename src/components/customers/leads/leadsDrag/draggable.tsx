/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { allLeadsByPipelineSchema, leadSchema } from '@/types/crm/leads'
import DropLead from './dropLead'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeStage } from '@/api/crm'
import { addToast } from '@heroui/react'
import { useState } from 'react'
import { useLeadDragSocket } from '@/hooks/socket'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

type TProps = {
  data: allLeadsByPipelineSchema
}
export default function LeadDraggable({ data }: TProps) {
  const [pendingLeadId, setPendingLeadId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const queryKey = ['leadsFunnel', data.pipeline.id]
  useLeadDragSocket(queryKey)

  const { mutate } = useMutation({
    mutationFn: changeStage,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['leads'] })
      const previousLeads = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(
        queryKey,
        (oldLead: allLeadsByPipelineSchema) => {
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
        queryClient.setQueryData(queryKey, context.previousLeads)
      }
      setPendingLeadId(null)
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: _err.message,
      })
    },
    onSettled: () => {
      setPendingLeadId(null)
      queryClient.invalidateQueries({
        queryKey,
      })
    },
  })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (active && over) {
      const new_stage_id = over.id.toString()
      const lead_id = active.id.toString()
      const findLead = data.data.find((lead) => lead.id === lead_id)
      if (findLead?.stageId === new_stage_id) return

      setPendingLeadId(lead_id)
      mutate({ new_stage_id, lead_id })
    }
  }
  return (
    <div className=" flex w-full relative min-h-[calc(100vh-200px-var(--header-height))] ">
      <div className="flex w-full h-auto justify-between gap-1  ">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          {data.pipeline.stages.map((stage) => {
            const findLeads = data.data.filter(
              (lead) => lead.stageId === stage.id
            )
            let totalValue = 0
            for (const lead of findLeads) {
              totalValue += lead.value || 0
            }
            return (
              <DropLead
                key={stage.id}
                stage={stage}
                rottenDays={stage.rottenDays}
                leads={findLeads}
                pendingLeadId={pendingLeadId}
                totalValue={totalValue}
              />
            )
          })}
        </DndContext>
      </div>
    </div>
  )
}
