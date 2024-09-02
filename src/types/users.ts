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
export type AllUsersSchema = z.infer<typeof ZAllUsers>
export type UserSchema = z.infer<typeof ZUser>
