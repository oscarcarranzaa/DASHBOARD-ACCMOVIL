import z from 'zod'

export const ZLeadsMetrics = z.object({
  date: z.string(),
  totalWonLeads: z.number(),
  totalLostLeads: z.number(),
  totalWonValue: z.number(),
  totalLostValue: z.number(),
})

export const ZLeadsMetricsResponse = z.array(ZLeadsMetrics)
export type LeadsMetricsResponseSchema = z.infer<typeof ZLeadsMetricsResponse>
