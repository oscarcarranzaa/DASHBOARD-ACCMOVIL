import { z } from 'zod'

export const ZCustomer = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.string().optional().nullable(),
  status: z.enum(['active', 'suspended', 'disabled']),
  gender: z.enum(['male', 'female', 'others']).nullable().optional(),
  avatar: z.string().nullable(),
  phone: z.string().nullable().optional(),
  birthDate: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const ZAllCustomer = z.object({
  data: z.array(ZCustomer),
  totalPages: z.number(),
  total: z.number(),
  limit: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})

export const ZPassword = z.object({
  password: z
    .string()
    .min(8, 'Contraseña muy corta.')
    .max(50, 'Contraseña muy larga.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
    ),
})

export const ZCreateCustomer = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    gender: z.string().optional(),
    phone: z.string().optional(),
  })
  .merge(ZPassword)

export type customerSchema = z.infer<typeof ZCustomer>
export type getAllCustomerSchema = z.infer<typeof ZAllCustomer>
export type createCustomerSchema = z.infer<typeof ZCreateCustomer>
