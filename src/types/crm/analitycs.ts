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
export const ZFunnelMetrics = z.object({
  funnel: z.string(),
  won: z.number(),
  value: z.number(),
})
export const ZUserSellMetrics = z.object({
  user: z.string(),
  won: z.number(),
  lost: z.number(),
})
export const ZAllUserSellMetrics = z.array(ZUserSellMetrics)
export type AllUserSellMetricsSchema = z.infer<typeof ZAllUserSellMetrics>

export const ZAllFunnelMetrics = z.array(ZFunnelMetrics)
export type AllFunnelMetricsSchema = z.infer<typeof ZAllFunnelMetrics>
export const ZAllResumeLeadsMetrics = z.array(ZResumeLeadsMetrics)
export type AllResumeLeadsMetricsSchema = z.infer<typeof ZAllResumeLeadsMetrics>
export const ZLeadsMetricsResponse = z.array(ZLeadsMetrics)
export type LeadsMetricsResponseSchema = z.infer<typeof ZLeadsMetricsResponse>
