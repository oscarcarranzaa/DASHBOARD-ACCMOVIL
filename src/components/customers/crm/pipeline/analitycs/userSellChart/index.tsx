'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/UI/chart'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { CustomYAxisTick } from './CustomYAxisTick '

export const description = 'A stacked bar chart with a legend'

const chartData = [
  { user: 'Josue Osorto', won: 186, lost: 80 },
  { user: 'Nazareth Lopez', won: 234, lost: 90 },
  { user: 'Linda Aplicano', won: 1200, lost: 230 },
  { user: 'Dayana Ramos', won: 237, lost: 120 },
  { user: 'Emili Yearwood', won: 73, lost: 190 },
  { user: 'Bessy Aguilera', won: 209, lost: 130 },
  { user: 'Oscar', won: 456, lost: 90 },
  { user: 'Fernanda', won: 1230, lost: 989 },
  { user: 'Brandy Murillo', won: 214, lost: 140 },
  { user: 'Ariana Sierra', won: 789, lost: 120 },
]

const chartConfig = {
  won: {
    label: 'Ganancias',
    color: '#149151',
  },
  lost: {
    label: 'Perdidas',
    color: '#db0206',
  },
} satisfies ChartConfig

export default function UserSellChart() {
  return (
    <Card>
      <CardHeader>Top de mejores vendedores (Ganancias)</CardHeader>
      <CardBody>
        <div className="p-2">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 36,
              }}
            >
              <CartesianGrid
                horizontal={false}
                strokeDasharray="3 3"
                opacity={0.2}
              />
              <YAxis
                dataKey="user"
                type="category"
                tickLine={false}
                tickMargin={0}
                axisLine={false}
                width={100}
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
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(value) =>
                      value.toLocaleString('es-HN', {
                        style: 'currency',
                        currency: 'HNL',
                      })
                    }
                  />
                }
              />
              <Bar
                dataKey="won"
                layout="vertical"
                fill="var(--color-won)"
                radius={[4, 0, 0, 4]}
              ></Bar>
              <Bar
                dataKey="lost"
                layout="vertical"
                fill="var(--color-lost)"
                radius={[4, 0, 0, 4]}
              ></Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardBody>
    </Card>
  )
}
