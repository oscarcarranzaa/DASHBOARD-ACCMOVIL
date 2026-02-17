'use client'

import { useParams, useRouter } from 'next/navigation'
import LeadHeader from '../leadHeader'
import { useQuery } from '@tanstack/react-query'
import { getAllsLeadsByPipeline } from '@/api/crm'
import LeadDraggable from './draggable'
import EmptyPipeline from '../../crm/pipeline/emptyPipeline'
import { Spinner } from '@heroui/react'
import { useMemo } from 'react'

type TProps = {
  pipelineId: string
}
export default function LeadDrag({ pipelineId }: TProps) {
  const router = useRouter()

  const { data, isPending, error } = useQuery({
    queryKey: ['leadsFunnel', pipelineId],
    queryFn: () =>
      getAllsLeadsByPipeline({
        page: '1',
        limit: '100',
        pipelineId,
      }),
    retry: 2,
    refetchOnWindowFocus: false,
  })

  const handleRouter = (url: string | undefined) => {
    if (url) {
      router.push(`/dash/embudo/${url}`)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <LeadHeader
          isRequired
          type="pipeline"
          onChange={handleRouter}
          value={pipelineId}
        />
      </div>
      <div className="h-full min-h-[calc(100vh-200px-var(--header-height))] relative ">
        {data && <LeadDraggable data={data} />}
        {isPending && (
          <div className="w-full flex  flex-col justify-center mt-40">
            <Spinner variant="spinner" label="Cargando su embudo..." />
          </div>
        )}
        {error && (
          <EmptyPipeline
            title={error.message}
            type="error"
            description="Parece que tuvimos un problema en mostrarte el embudo, contacta a soporte para más detalles."
          />
        )}
      </div>
    </div>
  )
}
