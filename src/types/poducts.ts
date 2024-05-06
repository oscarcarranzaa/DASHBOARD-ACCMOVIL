import { z } from 'zod'

/** Productos */

export const product = z.object({
  name: z.string().email({ message: 'Correo electrónico no es válido' }),
  code: z.string().min(8, { message: 'Contraseña muy corta' }),
  barCode: z.string().min(8, { message: 'Contraseña muy corta' }),
  price: z.number(),
  priceDiscount: z.number(),
  startDiscount: z.date(),
  endDiscount: z.date(),
  image: z.string(),
  stock: z.number(),
  minStock: z.number(),
})

export type newProduct = z.infer<typeof product>
