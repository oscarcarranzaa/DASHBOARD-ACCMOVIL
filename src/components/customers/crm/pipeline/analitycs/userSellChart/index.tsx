'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/UI/chart'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { getSellerMetrics } from '@/api/CRM/analitycs'
import UserSellChartSkeleton from './skeleton'
import { FilterFunnelAnalitycs } from '../header'

export const description = 'A stacked bar chart with a legend'

const chartConfig = {
  won: {
    label: 'Ganancias',
    color: '#1a81e8',
  },
} satisfies ChartConfig

export default function UserSellChart({
  filters,
}: {
  filters?: FilterFunnelAnalitycs | null
}) {
  const { data, isPending } = useQuery({
    queryKey: ['userSellMetrics', filters],
    queryFn: () => getSellerMetrics({ ...filters }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  })
  return (
    <Card className="h-auto mb-20">
      <CardHeader>Top vendedores (Ganancias)</CardHeader>
      <CardBody className="color-white fill-white text-white">
        <div className="p-2">
          {isPending && <UserSellChartSkeleton />}
          {data && data.length > 0 ? (
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={data}
                layout="vertical"
                margin={{
                  right: 16,
                }}
                barSize={40}
              >
                <CartesianGrid horizontal={false} opacity={0.2} />
                <YAxis
                  dataKey="user"
                  type="category"
                  tickLine={false}
                  tickMargin={0}
                  axisLine={false}
                  textAnchor="end"
                  opacity={1}
                  width={100}
                  hide
                />
                <XAxis
                  dataKey="won"
                  type="number"
                  tickLine={false}
                  tickMargin={0}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="won"
                  layout="vertical"
                  fill="var(--color-won)"
                  radius={4}
                >
                  <LabelList
                    dataKey="user"
                    position="insideLeft"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          ) : null}
          {data?.length === 0 ? (
            <p className="text-center py-10">No hay datos</p>
          ) : null}
        </div>
      </CardBody>
    </Card>
  )
}
