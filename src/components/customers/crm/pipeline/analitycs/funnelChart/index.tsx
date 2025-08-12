'use client'

import { Pie, PieChart, Cell } from 'recharts'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/UI/chart'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { getFunnelMetrics } from '@/api/CRM/analitycs'
import FunnelChartSkeleton from './skeleton'
import FunnelChartError from './error'
import { FilterFunnelAnalitycs } from '../header'

type chartDataType = {
  funnel: string
  won: number
  value: number
}[]

const generateChartConfig = (chartData?: chartDataType) => {
  const uniqueFunnels = chartData?.map((item) => item.funnel)

  return uniqueFunnels?.reduce(
    (acc, funnelName, i) => {
      acc[funnelName] = {
        label: funnelName,
        color: dynamicColor(i),
      }

      return acc
    },
    {} as Record<string, { label: string; color: string }>
  )
}
const dynamicColor = (index: number) => {
  const colors = [
    '#4F46E5', // Indigo elegante
    '#22D3EE', // Azul celeste moderno
    '#2DD4BF', // Verde agua sobrio
    '#10B981', // Verde esmeralda profundo
    '#84CC16', // Verde lima fresco
    '#FACC15', // Amarillo mostaza elegante
    '#FB923C', // Naranja suave quemado
    '#F43F5E', // Rosa sandía moderno
    '#A855F7', // Púrpura moderno
  ]

  return colors[index % colors.length]
}
const currencyFormatter = new Intl.NumberFormat('es-HN', {
  style: 'currency',
  currency: 'HNL',
  minimumFractionDigits: 2,
})

export default function FunnelChart({
  filters,
}: {
  filters?: FilterFunnelAnalitycs | null
}) {
  const { data, error, isPending } = useQuery({
    queryKey: ['funnelMetrics', filters],
    queryFn: () => getFunnelMetrics({ ...filters }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  })
  const chartConfig = generateChartConfig(data)
  return (
    <Card>
      <CardHeader>Ganancias por embudos (HNL)</CardHeader>
      <CardBody>
        {chartConfig && data && data.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:dark:fill-white [&_.recharts-text]:fill-black "
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="funnel"
                valueKey="value"
                label={({ value }) => currencyFormatter.format(value)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartConfig[entry.funnel]?.color}
                  />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="funnel" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        ) : null}
        {data?.length === 0 ? (
          <p className="text-center py-10">No hay datos</p>
        ) : null}
        {!error && isPending && <FunnelChartSkeleton />}
        {error && <FunnelChartError message={error.message} />}
      </CardBody>
    </Card>
  )
}
