import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/UI/chart'

type charDataType = {
  date: string
  lost: number
  won: number
}

type TProps = {
  data: charDataType[] | undefined
}
const chartConfig = {
  won: {
    label: 'Ganado',
    color: '#23f77b',
  },
  lost: {
    label: 'Perdido',
    color: '#f73123',
  },
} satisfies ChartConfig

export default function LeadChartMetrics({ data }: TProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-won)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-won)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-lost)" stopOpacity={0.8} />
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
                return new Date(value).toLocaleDateString('es-HN', {
                  month: 'long',
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
  )
}
