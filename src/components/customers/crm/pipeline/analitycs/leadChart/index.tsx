'use client'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/UI/chart'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

type charDataType = {
  date: string
  lost: number
  won: number
}
const chartData: charDataType[] = [
  { date: '2024-04-01', lost: 200, won: 150 },
  { date: '2024-04-02', lost: 200, won: 100 },
  { date: '2024-04-03', lost: 167, won: 120 },
  { date: '2024-04-04', lost: 242, won: 260 },
  { date: '2024-04-05', lost: 373, won: 290 },
  { date: '2024-04-06', lost: 301, won: 340 },
  { date: '2024-04-07', lost: 245, won: 180 },
  { date: '2024-04-08', lost: 409, won: 320 },
  { date: '2024-04-09', lost: 59, won: 110 },
  { date: '2024-04-10', lost: 261, won: 190 },
  { date: '2024-04-11', lost: 327, won: 350 },
  { date: '2024-04-12', lost: 292, won: 210 },
  { date: '2024-04-13', lost: 342, won: 380 },
  { date: '2024-04-14', lost: 137, won: 220 },
  { date: '2024-04-15', lost: 120, won: 170 },
  { date: '2024-04-16', lost: 300, won: 190 },
  { date: '2024-04-17', lost: 446, won: 360 },
  { date: '2024-04-18', lost: 605, won: 410 },
  { date: '2024-04-19', lost: 434, won: 180 },
  { date: '2024-04-20', lost: 432, won: 150 },
  { date: '2024-04-21', lost: 567, won: 200 },
  { date: '2024-04-22', lost: 234, won: 170 },
  { date: '2024-04-23', lost: 456, won: 230 },
  { date: '2024-04-24', lost: 387, won: 290 },
  { date: '2024-04-25', lost: 215, won: 250 },
  { date: '2024-04-26', lost: 75, won: 130 },
  { date: '2024-04-27', lost: 383, won: 420 },
  { date: '202-04-28', lost: 122, won: 180 },
  { date: '2024-04-29', lost: 315, won: 240 },
  { date: '2024-04-30', lost: 454, won: 380 },
  { date: '2024-05-01', lost: 165, won: 220 },
  { date: '2024-05-02', lost: 293, won: 310 },
  { date: '2024-05-03', lost: 0, won: 500 },
  { date: '2024-05-04', lost: 385, won: 420 },
  { date: '2024-05-05', lost: 481, won: 390 },
  { date: '2024-05-06', lost: 498, won: 520 },
  { date: '2024-05-07', lost: 388, won: 300 },
]
const chartConfig = {
  won: {
    label: 'Ganado',
    color: '#148048',
  },
  lost: {
    label: 'Perdido',
    color: '#db0206',
  },
} satisfies ChartConfig

export default function LeadChart() {
  const [timeRange, setTimeRange] = useState('90d')
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })
  return (
    <div className="flex flex-col mt-10">
      <div>
        <Card>
          <CardHeader> Análisis de clientes potenciales cerrados</CardHeader>

          <CardBody>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-won)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-won)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-lost)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-lost)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  className="dark:stroke-default-800 stroke-default-300 dark:opacity-20"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString('es-HN', {
                      month: 'short',
                      day: 'numeric',
                      year: '2-digit',
                    })
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="lost"
                  type="natural"
                  fill="url(#fillMobile)"
                  stroke="var(--color-lost)"
                  stackId="a"
                />
                <Area
                  dataKey="won"
                  type="natural"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-won)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
