import { z } from 'zod'

/** Productos */

export const product = z
  .object({
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
    active: z.boolean(),
    note: z.string().optional(),
    minStock: z.number().optional(),
  })
  .refine(
    (data) => {
      if (!data.priceDiscount?.price) return true
      const discount = data.price > data.priceDiscount.price
      return discount
    },
    {
      message: 'No puede ser mayor al precio',
      path: ['priceDiscount'],
    }
  )

export type newProduct = z.infer<typeof product>
