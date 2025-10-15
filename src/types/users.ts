import { z } from 'zod'

export const team = z.object({
  id: z.string(),
  role: z.string(),
  job: z.string().optional(),
})
export const ZAddress = z.object({
  reference: z.string().optional(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
})
export const ZUserNameData = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().nullable(),
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
  firstName: z
    .string('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre debe tener menos de 100 caracteres'),
  lastName: z
    .string('El apellido es requerido')
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(100, 'El apellido debe tener menos de 100 caracteres'),
  username: z
    .string('El username es requerido')
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(30, 'El username debe tener menos de 30 caracteres'),
  gender: z.string().nullable(),
  job: z
    .string('El trabajo es requerido')
    .min(3, 'El trabajo debe tener al menos 3 caracteres')
    .max(100, 'El trabajo debe tener menos de 100 caracteres'),
  role: ZRole.optional().nullable(),
  roleId: z.string().optional().nullable(),
  email: z.email({ message: 'El email es requerido' }),
  is_owner: z.boolean(),
  is_user_root: z.boolean(),
  phone: z.string().nullable(),
  avatar: z.string().nullable(),
  birthDate: z.string().nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'TERMINATED']),
  documentNumber: z.string().nullable().optional(),
  createdAt: z.string(),
})
export const ZEditUser = ZUser.pick({
  firstName: true,
  lastName: true,
  username: true,
  is_owner: true,
  job: true,
  phone: true,
  roleId: true,
  birthDate: true,
  documentNumber: true,
})
export const ZUserOwner = ZUser.and(
  z.object({
    is_owner: z.boolean(),
    lastLogin: z.string().nullable().optional(),
  })
)
export const ZPreviewUser = ZUser.pick({
  id: true,
  firstName: true,
  lastName: true,
  avatar: true,
  job: true,
  username: true,
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
export const ZCountUserActivities = z.object({
  userId: z.string(),
  countLeads: z.number(),
})
export const ZDisableUser = z
  .object({
    userId: z.string(),
  })
  .merge(ZUser.pick({ status: true }))
export const ZGetPermissions = z.array(ZPermissions)
export const ZUserPermissions = z
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
  .optional()

export const ZNewRole = z.object({
  name: z.string(),
  keys: z.array(z.string()),
})
export const ZAllUsers = z.object({
  data: z.array(ZUserOwner),
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
  roleId: z.string().nullable(),
})
export const ZEditProfileInfo = ZPassword.pick({
  firstName: true,
  lastName: true,
  username: true,
}).merge(
  z.object({
    birthDate: z.string().optional().nullable(),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^[0-9]{8}$/.test(val), {
        message: 'El número de teléfono debe tener exactamente 8 dígitos.',
      }),
    documentNumber: z.string().optional(),
  })
)
export const ZCreateUser = ZUser.pick({
  email: true,
}).merge(ZPassword)

export const ZChangePassword = z
  .object({
    currentPass: z
      .string()
      .min(8, 'Contraseña muy corta.')
      .max(32, 'Contraseña muy larga.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
      ),
    newPass: z
      .string()
      .min(8, 'Contraseña muy corta.')
      .max(32, 'Contraseña muy larga.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
      ),
  })
  .refine(
    (data) => {
      return data.currentPass !== data.newPass
    },
    {
      message: 'La nueva contraseña no debe ser igual a la anterior.',
      path: ['newPass'],
    }
  )

export const ZUserToken = z.object({
  response: z.object({
    success: z.boolean(),
    msg: z.string(),
  }),
  data: z.object({
    user: ZUserOwner,
    token: z.string(),
    expireToken: z.number(),
  }),
})
export type changePassSchema = z.infer<typeof ZChangePassword>
export type getPermissionsType = z.infer<typeof ZGetPermissions>
export type userPermissionsType = z.infer<typeof ZUserPermissions>
export type roleType = z.infer<typeof ZRole>
export type rolePermissions = z.infer<typeof ZRolePermissions>
export type getAllRolesType = z.infer<typeof ZAllRoles>
export type newRoleType = z.infer<typeof ZNewRole>
export type CreateUserSchema = z.infer<typeof ZCreateUser>
export type AllUsersSchema = z.infer<typeof ZAllUsers>
export type UserSchema = z.infer<typeof ZUser>
export type editProfileInfoSchema = z.infer<typeof ZEditProfileInfo>
export type UserOwnerSchema = z.infer<typeof ZUserOwner>
export type CountUserActivities = z.infer<typeof ZCountUserActivities>
export type DisableUserSchema = z.infer<typeof ZDisableUser>
export type UserTokenSchema = z.infer<typeof ZUserToken>
