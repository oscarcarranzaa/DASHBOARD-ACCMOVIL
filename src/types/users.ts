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

export const ZRole = z.object({
  id: z.string(),
  name: z.string(),
  keys: z.array(z.string()),
  createdAt: z.string(),
})
export const ZPermissions = z.object({
  name: z.string(),
  key: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      key: z.string(),
      active: z.boolean(),
      requiredKeys: z.array(z.string()).optional(),
    })
  ),
})
export const ZAllRoles = z.array(
  ZRole.merge(
    z.object({
      user: z.optional(z.array(z.object({ id: z.string() }))),
    })
  )
)
export const ZUser = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  gender: z.string().nullable(),
  job: z.string(),
  role: ZRole.nullable(),
  email: z.string().email(),
  phone: z.string().nullable(),
  avatar: z.string().nullable(),
  birthDate: z.string().nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'TERMINATED']),
  document_number: z.string().nullable(),
  createdAt: z.string(),
})
export const ZRolePermissions = ZRole.merge(
  z.object({
    permissions: z.array(ZPermissions),
    users: z
      .array(
        ZUser.pick({
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          gender: true,
          job: true,
          email: true,
          avatar: true,
        })
      )
      .optional(),
  })
)
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
    .min(8, 'Contraseña muy corta.')
    .max(50, 'Contraseña muy larga.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
    ),
  firstName: z
    .string()
    .min(3, 'Nombre muy corto.')
    .max(100, 'Nombre muy largo.')
    .trim(),
  lastName: z
    .string()
    .min(3, 'Apellido muy corto.')
    .max(100, 'Apellido muy largo.')
    .trim(),
  username: z
    .string()
    .min(3, { message: 'El username debe tener al menos 3 caracteres' })
    .max(30, { message: 'El username no puede tener más de 30 caracteres' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        'El username solo puede contener letras, números y guiones bajos',
    }),
  job: z.string(),
})
export const ZCreateUser = ZUser.pick({
  email: true,
}).merge(ZPassword)

export type rolePermissions = z.infer<typeof ZRolePermissions>
export type getAllRolesType = z.infer<typeof ZAllRoles>
export type CreateUserSchema = z.infer<typeof ZCreateUser>
export type AllUsersSchema = z.infer<typeof ZAllUsers>
export type UserSchema = z.infer<typeof ZUser>
