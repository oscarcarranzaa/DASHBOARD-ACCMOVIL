import { z } from 'zod'

/** Login */

export const login = z.object({
  email: z.string().email({ message: 'Correo electrónico no es válido' }),
  password: z.string().min(8, { message: 'Contraseña muy corta' }),
})
export type TSVG = {
  size: number
}
export interface IUploads {
  imgURI: string
  urlMedia: string
  name: string
  progress?: number
  id: string
  mediaIDItem: string
}
export type TAuth = {}
export type LoginSchema = z.infer<typeof login>
