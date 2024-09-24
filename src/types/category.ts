import { z } from 'zod'
import { media } from './schemas'

export const ZCategory = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  children: z.boolean(),
  keywords: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export const ZOneCategory = ZCategory.extend({
  media: media.optional().nullable(),
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
