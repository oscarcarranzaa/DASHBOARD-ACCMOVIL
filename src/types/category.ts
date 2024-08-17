import { z } from 'zod'
import { media } from './schemas'

export const ZCategory = z.object({
  _id: z.string(),
  name: z.string(),
  parent: z.string().optional(),
  slug: z.string(),
  child: z.boolean(),
  description: z.string().optional(),
  image: z.string().optional(),
  keywords: z.string().optional(),
})
export const ZOneCategory = ZCategory.omit({ image: true }).extend({
  image: media.optional(),
})
export const ZCategories = z.object({
  categories: z.array(ZCategory),
  parent: ZCategory.optional(),
})
export const ZNewCategoryForm = z.object({
  name: z.string(),
  parent: z.string().optional(),
  description: z.string().optional(),
  keywords: z.string().optional(),
  image: z.string().optional(),
})
export type newCategoryForm = z.infer<typeof ZNewCategoryForm>
export type ZCategorySchema = z.infer<typeof ZCategories>
export type oneCategorySchema = z.infer<typeof ZOneCategory>
export type CategorySchema = z.infer<typeof ZCategory>
