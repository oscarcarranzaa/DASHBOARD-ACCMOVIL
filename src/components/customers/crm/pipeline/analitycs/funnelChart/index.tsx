'use client'

import { Pie, PieChart, LabelList, Cell } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/UI/chart'
import { Card, CardBody, CardHeader } from '@heroui/react'

type chartDataType = {
  funnel: string
  won: number
}[]

const generateChartConfig = (chartData: chartDataType) => {
  const uniqueFunnels = chartData.map((item) => item.funnel)

  return uniqueFunnels.reduce(
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
    '#FF6B6B', // Coral suave
    '#FFD93D', // Amarillo vibrante
    '#6BCB77', // Verde menta
    '#4D96FF', // Azul brillante
    '#843bff', // Púrpura vibrante
    '#FF9F1C', // Naranja dorado
    '#38B6FF', // Azul cielo eléctrico
    '#FF61A6', // Rosa fuerte
    '#00C49A', // Verde turquesa
  ]

  return colors[index % colors.length]
}

const chartData: chartDataType = [
  { funnel: 'Ventas B2B', won: 2341 },
  { funnel: 'Ventas por teléfono', won: 187 },
  { funnel: 'Ventas en presencia', won: 200 },
  { funnel: 'Ventas en línea', won: 187 },
]

const chartConfig = generateChartConfig(chartData)

export default function FunnelChart() {
  return (
    <Card>
      <CardHeader>Ganancias por embudos</CardHeader>
      <CardBody>
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-white aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Pie data={chartData} dataKey="won" label nameKey="funnel">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.funnel]?.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardBody>
    </Card>
  )
}
