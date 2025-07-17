import { z } from 'zod'

export interface IAuth {
  response: Response
  data: Data
}

export const ZMessage = z.object({
  success: z.boolean(),
  msg: z.string(),
})
export const ZResponse = z.object({
  response: ZMessage,
})

export interface Data {
  user: User
  token: string
  expireToken: number
  secure: boolean
}

export const ZChangeRecoveryPassword = z
  .object({
    password: z
      .string()
      .min(8, 'Contraseña muy corta.')
      .max(50, 'Contraseña muy larga.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
      ),
    confirmPass: z
      .string()
      .min(8, 'Contraseña muy corta.')
      .max(50, 'Contraseña muy larga.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
      ),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPass
    },
    {
      message: 'Las contraseñas no coinciden.',
      path: ['confirmPass'],
    }
  )

export interface User {
  id: string
  email: string
  status: string
}
export type changeRecoveryPasswordType = z.infer<typeof ZChangeRecoveryPassword>
export type Response = z.infer<typeof ZResponse>
