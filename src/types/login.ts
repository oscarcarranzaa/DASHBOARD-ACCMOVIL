import { ZUserOwner } from '@/types/users'
import { z } from 'zod'

export const ZLoginSchema = z.object({
  response: z.object({
    success: z.boolean(),
    msg: z.string(),
  }),
  data: z.object({
    user: ZUserOwner,
    token: z.string(),
    expireToken: z.number(),
    secure: z.boolean(),
  }),
})
export const ZCheckPermission = z.object({
  response: z.object({
    success: z.boolean(),
    msg: z.string(),
  }),
})
export type checkPermissionSchema = z.infer<typeof ZCheckPermission>
export type loginSchema = z.infer<typeof ZLoginSchema>
