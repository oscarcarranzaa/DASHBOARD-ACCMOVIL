import { z } from 'zod'

export const ZTerms = z.object({
  _id: z.string(),
  name: z.string(),
  colors: z.string().array(),
  attribute: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  option: z.string().optional(),
})
export const ZAttributes = z.object({
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
