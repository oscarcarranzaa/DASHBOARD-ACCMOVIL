import { z } from 'zod'

/** Login */

export const login = z.object({
  email: z.string().email({ message: 'Correo electrónico no es válido' }),
  password: z
    .string()
    .min(8, 'Contraseña muy corta.')
    .max(50, 'Contraseña muy larga.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número.'
    ),
})
export type TSVG = {
  size: number
  color?: string
}
export interface IUploads {
  imgURI: string
  urlMedia: string
  name: string
  progress?: number
  id: string
}
export type TAuth = {}
export type LoginSchema = z.infer<typeof login>
