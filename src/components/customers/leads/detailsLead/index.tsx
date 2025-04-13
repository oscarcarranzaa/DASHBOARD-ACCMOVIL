'use client'

import { useQuery } from '@tanstack/react-query'
import LeadDetailsHeader from './header'
import { getOneLead } from '@/api/crm'
import LeadSummary from './summary'
import LeadHistory from './history'
import UpdateStage from './updateStage'
import LeadTasksInput from './tasks'

type TProps = {
  leadId: string
}
export default function DetailsLead({ leadId }: TProps) {
  const leadQueryKey = ['oneLead', leadId]
  const { data, isPending } = useQuery({
    queryKey: leadQueryKey,
    queryFn: () => getOneLead(leadId),
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {data && <LeadDetailsHeader lead={data} />}
      <div className="mt-3 px-1">{data && <UpdateStage lead={data} />}</div>
      <div className=" grid gap-2 grid-cols-6 overflow-auto  mt-8 flex-shrink flex-grow">
        <div className=" col-span-2 overflow-auto">
          {data && <LeadSummary lead={data} />}
        </div>
        <div className=" col-span-4 px-1 flex flex-col h-full  overflow-auto">
          <LeadTasksInput />
          <LeadHistory leadId={leadId} />
        </div>
      </div>
    </>
  )
}
