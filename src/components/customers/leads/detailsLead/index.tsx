'use client'

import { useQuery } from '@tanstack/react-query'
import LeadDetailsHeader from './header'
import { getOneLead } from '@/api/crm'
import LeadSummary from './summary'
import LeadHistory from './history'
import UpdateStage from './updateStage'
import LeadTasksInput from './tasks'
import LeadDetailsSkeleton from './skeleton'
import EmptyPipeline from '../../crm/pipeline/emptyPipeline'
import NavegationPages from '@/components/navegationPages'

type TProps = {
  leadId: string
}
export default function DetailsLead({ leadId }: TProps) {
  const leadQueryKey = ['oneLead', leadId]
  const { data, isPending, error } = useQuery({
    queryKey: leadQueryKey,
    queryFn: () => getOneLead(leadId),
    refetchOnWindowFocus: false,
    retry: 1,
  })
  if (error?.cause === 404) {
    return (
      <>
        <NavegationPages text="Regresar" />
        <EmptyPipeline
          type="error"
          title="Ocurrió un error al obtener datos"
          description={error.message}
        />
      </>
    )
  }
  return (
    <>
      {isPending && (
        <LeadDetailsSkeleton>
          <LeadHistory leadId={leadId} hiddenButtons />
        </LeadDetailsSkeleton>
      )}
      {data && <LeadDetailsHeader lead={data} />}
      {data && (
        <div className="mt-3 px-1">
          <UpdateStage lead={data} />
        </div>
      )}
      {data && (
        <div className=" grid gap-2 grid-cols-6 overflow-auto  mt-8 shrink grow">
          <div className=" col-span-2 overflow-auto">
            {data && <LeadSummary lead={data} />}
          </div>
          <div className=" col-span-4 px-1 flex flex-col h-full  overflow-auto">
            <LeadTasksInput />
            <LeadHistory leadId={leadId} />
          </div>
        </div>
      )}
    </>
  )
}
