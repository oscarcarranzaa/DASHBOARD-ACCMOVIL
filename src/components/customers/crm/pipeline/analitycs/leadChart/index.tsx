'use client'

import { Card, CardBody, CardHeader, Tab, Tabs } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { TParamsMetrics, getLeadsMetrics } from '@/api/CRM/analitycs'
import LeadChartSkeleton from './skeleton'
import LeadChartMetrics from './chart'
import { DollarSign, User } from 'lucide-react'

type TProps = {
  filters?: TParamsMetrics | null
}
export default function LeadChart({ filters }: TProps) {
  const { data, isPending } = useQuery({
    queryKey: ['leads-metrics', filters],
    queryFn: () => getLeadsMetrics(filters || {}),
    refetchOnWindowFocus: false,
  })

  const chartValueData = data?.map((item) => ({
    date: item.date,
    lost: item.totalLostValue,
    won: item.totalWonValue,
  }))
  const chartLeadData = data?.map((item) => ({
    date: item.date,
    lost: item.totalLostLeads,
    won: item.totalWonLeads,
  }))

  return (
    <div className="flex flex-col mt-10">
      <div>
        <Card>
          <CardHeader>Métricas de clientes potenciales</CardHeader>
          <CardBody>
            <Tabs
              aria-label="Options"
              color="primary"
              variant="bordered"
              defaultSelectedKey={'revenue'}
            >
              <Tab
                key="revenue"
                title={
                  <div className="flex items-center space-x-2">
                    <DollarSign size={18} />
                    <span>Ganancias</span>
                  </div>
                }
              >
                <span className=" opacity-80 text-sm">
                  Análisis basado en Ganancias, representado en la moneda (HNL).
                </span>
                {isPending ? (
                  <LeadChartSkeleton />
                ) : (
                  <LeadChartMetrics data={chartValueData} />
                )}
              </Tab>
              <Tab
                key="customer"
                title={
                  <div className="flex items-center space-x-2">
                    <User size={18} />
                    <span>Clientes</span>
                  </div>
                }
              >
                <span className=" opacity-80 text-sm">
                  Análisis basado en Clientes potenciales que ya han sido
                  cerrados.
                </span>
                {isPending ? (
                  <LeadChartSkeleton />
                ) : (
                  <LeadChartMetrics data={chartLeadData} />
                )}
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
