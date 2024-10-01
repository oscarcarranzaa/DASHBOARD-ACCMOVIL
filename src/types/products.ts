import { z } from 'zod'
import { media, user } from './schemas'

/** Productos */

export const ZProduct = z.object({
  id: z.string(),
  name: z.string().min(3),
  isActive: z.boolean(),
  barCode: z.string().nullable(),
  sku: z.string().nullable(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
  startDiscount: z.string().optional().nullable(),
  endDiscount: z.string().optional().nullable(),
  image: z.string().nullable().optional(),
  stock: z.number(),
  minStock: z.number().optional(),
  salesNote: z.string().nullable().optional(),
  userId: z.string(),
  media: media.optional().nullable(),
  User: user,
  updatedAt: z.string(),
  createdAt: z.string(),
})
export const ZProductInfo = ZProduct.omit({ User: true, media: true })
export const ZProductNew = ZProduct.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  media: true,
  User: true,
})
export const ZGetProducts = z.object({
  data: z.array(ZProduct),
  totalPages: z.number(),
  limit: z.number(),
  results: z.number(),
  totalProducts: z.number(),
  pageNumber: z.number(),
})
export type productSchema = z.infer<typeof ZProduct>
export type productInfoType = z.infer<typeof ZProductInfo>
export type getProductsSchema = z.infer<typeof ZGetProducts>
export type newProductSchema = z.infer<typeof ZProductNew>
