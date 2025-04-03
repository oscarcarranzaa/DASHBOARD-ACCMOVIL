'use client'

import { useQuery } from '@tanstack/react-query'
import LeadDetailsHeader from './header'
import { getOneLead } from '@/api/crm'
import LeadSummary from './summary'
import LeadHistory from './history'
import UpdateStage from './updateStage'

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
      <div className="mt-3 px-2">{data && <UpdateStage lead={data} />}</div>
      <div className=" grid gap-2 grid-cols-6 mt-8">
        <div className=" col-span-2">{data && <LeadSummary lead={data} />}</div>
        <div className=" col-span-4">
          <LeadHistory />
        </div>
      </div>
    </>
  )
}
