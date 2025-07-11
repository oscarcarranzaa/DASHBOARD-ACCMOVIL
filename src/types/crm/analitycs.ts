import z from 'zod'

export const ZLeadsMetrics = z.object({
  date: z.string(),
  totalWonLeads: z.number(),
  totalLostLeads: z.number(),
  totalWonValue: z.number(),
  totalLostValue: z.number(),
})

export const ZResumeLeadsMetrics = z.object({
  title: z.string(),
  isCurrency: z.boolean().optional(),
  current: z.number(),
  previous: z.number(),
  difference: z.number(),
  percent: z.string(),
  trend: z.enum(['up', 'down', 'equal']),
})
export const ZAllResumeLeadsMetrics = z.array(ZResumeLeadsMetrics)
export type AllResumeLeadsMetricsSchema = z.infer<typeof ZAllResumeLeadsMetrics>
export const ZLeadsMetricsResponse = z.array(ZLeadsMetrics)
export type LeadsMetricsResponseSchema = z.infer<typeof ZLeadsMetricsResponse>
