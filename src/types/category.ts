import { z } from 'zod'

export const ZCategory = z.object({
  _id: z.string(),
  name: z.string(),
  parent: z.string().optional(),
  slug: z.string(),
  child: z.boolean(),
})

export const ZCategories = z.object({
  categories: z.array(ZCategory),
  parent: ZCategory.optional(),
})
export type ZCategorySchema = z.infer<typeof ZCategories>
export type CategorySchema = z.infer<typeof ZCategory>
