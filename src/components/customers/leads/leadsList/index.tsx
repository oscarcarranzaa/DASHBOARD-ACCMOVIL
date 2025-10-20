'use client'

import { getAllsLeads } from '@/api/crm'
import { useQuery } from '@tanstack/react-query'
import LeadTable from './table'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from '@heroui/react'
import Link from 'next/link'
import LeadHeader from '../leadHeader'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StartPipeline from '../../crm/pipeline/startPipeline'

export default function LeadList() {
  const [seletedFunnel, setSelectedFunnel] = useState<string | undefined>()
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const handleEmpty = (isEmpty: boolean) => {
    setIsEmpty(isEmpty)
    if (isEmpty) {
      setSelectedFunnel(undefined)
    }
  }

  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('leadPage')) || 1
  const pathname = usePathname()
  const router = useRouter()

  const { data, isPending } = useQuery({
    queryKey: ['leads', currentPage.toString(), seletedFunnel],
    queryFn: () =>
      getAllsLeads({
        page: currentPage.toString(),
        limit: '20',
        pipelineId: seletedFunnel,
      }),
    refetchOnWindowFocus: true,
  })
  const createPageUrl = (funnelId: string | undefined) => {
    if (!funnelId) {
      router.push(pathname)
      return
    }
    const params = new URLSearchParams(searchParams)
    params.set('id', funnelId)
    const url = `${pathname}?${params.toString()}`
    router.push(url)
    return
  }

  const handleFunnel = (url: string | undefined) => {
    setSelectedFunnel(url)
    createPageUrl(url)
  }
  return (
    <>
      <LeadHeader onChange={handleFunnel} onEmpty={handleEmpty} />
      <div className="mt-4">
        {isEmpty ? (
          <StartPipeline />
        ) : (
          <LeadTable
            leadsData={data}
            isPending={isPending}
            totalPages={data && Number(data.totalPages)}
          />
        )}
      </div>
    </>
  )
}
