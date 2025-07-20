import { z } from 'zod'

export const searchSchema = z.object({
  id: z.string(),
  type: z.enum(['contact', 'lead', 'product', 'customer']),
  title: z.string(),
  description: z.string(),
})
export const ZSearchAll = z.array(searchSchema)
export type SearchAllType = z.infer<typeof ZSearchAll>
