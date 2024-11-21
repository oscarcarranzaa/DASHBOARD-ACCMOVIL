import { z } from 'zod'
import { user } from './schemas'

export const ZLoginSchema = z.object({
  response: z.object({
    success: z.boolean(),
    msg: z.string(),
  }),
  data: z.object({
    user: user,
    token: z.string(),
    expireToken: z.number(),
    secure: z.boolean(),
  }),
})
export type loginSchema = z.infer<typeof ZLoginSchema>
