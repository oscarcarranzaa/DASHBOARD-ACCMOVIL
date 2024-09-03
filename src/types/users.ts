import { z } from 'zod'
import { media } from './schemas'

export const team = z.object({
  _id: z.string(),
  role: z.string(),
  job: z.string().optional(),
})
export const ZAddress = z.object({
  reference: z.string().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
})

export const ZUser = z.object({
  _id: z.string(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  avatar: media.optional(),
  birthDate: z.date().optional(),
  status: z.enum(['active', 'suspended', 'disabled']),
  verify: z.boolean(),
  points: z.number().optional(),
  team: team.optional(),
  address: ZAddress.optional(),
  createdAt: z.string(),
})
export const ZAllUsers = z.object({
  data: z.array(ZUser),
  totalPages: z.number(),
  total: z.number(),
  limit: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})
export const ZPassword = z.object({
  password: z
    .string()
    .min(8, 'Contraseña muy corta')
    .max(50, 'Contraseña muy larga')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
    ),
  firstName: z.string().min(3, 'Nombre muy corto').max(100, 'Nombre muy largo'),
  lastName: z
    .string()
    .min(3, 'Apellido muy corto')
    .max(100, 'Apellido muy largo'),
})
export const ZCreateUser = ZUser.pick({
  email: true,
}).merge(ZPassword)

export type CreateUserSchema = z.infer<typeof ZCreateUser>
export type AllUsersSchema = z.infer<typeof ZAllUsers>
export type UserSchema = z.infer<typeof ZUser>
