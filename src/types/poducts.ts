import { z } from 'zod'

/** Productos */

export const product = z
  .object({
    name: z.string(),
    code: z.string(),
    barCode: z.string().optional(),
    price: z.number(),
    priceDiscount: z.number().optional(),
    startDiscount: z.string().optional(),
    endDiscount: z.string().optional(),
    image: z.string().optional(),
    stock: z.number(),
    visible: z.boolean(),
    note: z.string().optional(),
    minStock: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.priceDiscount) {
        const discount = data.price > data.priceDiscount
        return discount
      }
    },
    {
      message: 'No puede ser mayor al precio',
      path: ['priceDiscount'],
    }
  )

export type newProduct = z.infer<typeof product>
