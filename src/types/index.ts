import { z } from 'zod'

/** Login */

export const login = z.object({
  email: z.string().email({ message: 'Correo electrónico no es válido' }),
  password: z.string().min(8, { message: 'Contraseña muy corta' }),
})
export type TSVG = {
  size: number
  fill: string
}
export type TAuth = {}
export type LoginSchema = z.infer<typeof login>
