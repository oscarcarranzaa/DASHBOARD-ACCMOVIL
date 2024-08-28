import { z } from 'zod'
import { media } from './schemas'

export const ZTerms = z.object({
  _id: z.string(),
  name: z.string(),
  colors: z.string().array(),
  attribute: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  option: z.string().optional(),
  image: media.optional(),
  slug: z.string(),
})
export const ZAttributes = z.object({
  _id: z.string(),
  name: z.string(),
  terms: z.array(z.string()),
  type: z.string(),
  user: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export const ZOneAttribute = z.object({
  _id: z.string(),
  name: z.string(),
  terms: z.array(ZTerms),
  type: z.string(),
  user: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ZAttributesAll = z.array(ZAttributes)
export type AttributeSchema = z.infer<typeof ZAttributesAll>
export type ZTermsSchema = z.infer<typeof ZTerms>
export type ZOneAttributeSchema = z.infer<typeof ZOneAttribute>
