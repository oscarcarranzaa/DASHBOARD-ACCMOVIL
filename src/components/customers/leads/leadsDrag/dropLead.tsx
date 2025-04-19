'use client'

import { leadSchema } from '@/types/crm/leads'
import { stageSchema } from '@/types/crm/pipeline'
import { DollarSign, User } from 'lucide-react'
import LeadCard from './leadCard'
import { useDroppable } from '@dnd-kit/core'

type TProps = {
  stage: stageSchema
  totalValue: number
  leads: leadSchema[]
  pendingLeadId?: string | null
}
export default function DropLead({
  stage,
  leads,
  totalValue,
  pendingLeadId,
}: TProps) {
  const { isOver, setNodeRef } = useDroppable({ id: stage.id })
  return (
    <div
      key={stage.id}
      ref={setNodeRef}
      className={` flex flex-col h-full min-w-36 w-full rounded-t-lg ${isOver ? 'bg-zinc-200 dark:bg-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800'} `}
    >
      <div className="flex flex-col justify-center sticky top-0 bg-zinc-50 border border-zinc-300 rounded-t-lg dark:border-zinc-700  p-2 dark:bg-zinc-950">
        <p className="text-center  line-clamp-1 text-base font-semibold">
          {stage.name}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-1 items-center" title="Clientes">
            <User size={16} />
            <p className="text-sm ">{leads.length} </p>
          </div>

          <span>-</span>
          <div
            className="flex gap-1 items-center text-green-600 "
            title="Total"
          >
            <p className="text-sm ">
              {totalValue.toLocaleString('es-HN', {
                style: 'currency',
                currency: 'HNL',
              })}
            </p>
          </div>
        </div>
      </div>
      <div
        className={` ${isOver ? 'bg-zinc-200 dark:bg-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800'}  flex-shrink-0 flex-grow-0`}
      >
        <div className="px-1 py-2 flex flex-col gap-1 relative">
          {leads.map((lead) => {
            return (
              <LeadCard
                isPending={pendingLeadId === lead.id}
                pipelineId={lead.pipelineId}
                id={lead.id}
                key={lead.id}
                title={lead.title}
                contactName={lead.contact.name}
                value={lead.value}
                user={lead.user?.firstName}
                avatar={`${lead.user?.avatar}-thumb.webp`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
