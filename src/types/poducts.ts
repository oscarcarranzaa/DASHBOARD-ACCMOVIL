import { z } from 'zod'
import { media } from './schemas'

/** Productos */

export const product = z.object({
  name: z.string(),
  code: z.string(),
  barCode: z.string().optional(),
  price: z.number(),
  priceDiscount: z
    .object({
      price: z.number().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
  image: z.string().optional(),
  stock: z.number(),
  active: z.boolean().optional(),
  note: z.string().optional(),
  minStock: z.number().optional(),
})

export const getProductImage = product
  .omit({ image: true })
  .extend({ _id: z.string(), image: media.optional() })

export const getProduct = z.object({
  data: z.array(getProductImage),
  totalPages: z.number(),
  limit: z.number(),
  results: z.number(),
  totalProducts: z.number(),
  pageNumber: z.number(),
})
export type getProductImageSchema = z.infer<typeof getProductImage>
export type getProductSchema = z.infer<typeof getProduct>
export type newProduct = z.infer<typeof product>
