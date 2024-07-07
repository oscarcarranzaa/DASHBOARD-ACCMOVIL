import { z } from 'zod'

export const ZCategory = z.object({
  _id: z.string(),
  name: z.string(),
  parent: z.string(),
  slug: z.string(),
})
export type CategorySchema = z.infer<typeof ZCategory>
