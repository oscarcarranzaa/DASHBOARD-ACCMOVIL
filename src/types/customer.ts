import { z } from 'zod'

export const ZCustomer = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.string().optional().nullable(),
  status: z.enum(['active', 'suspended', 'disabled']),
  gender: z.enum(['male', 'female', 'others']).nullable().optional(),
  avatar: z.string().nullable(),
  phone: z.string().nullable().optional(),
  birthDate: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const ZAllCustomer = z.object({
  data: z.array(ZCustomer),
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
})

export const ZCreateCustomer = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    gender: z.string().optional(),
    phone: z.string().optional(),
  })
  .merge(ZPassword)

export const ZContact = z.object({
  id: z.string(),
  name: z.string().min(3, 'Nombre muy corto'),
  labelId: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  status: z.enum(['SUBSCRIBED', 'UNSUBSCRIBED', 'BOUNCED']),
  email: z.string().email().nullable().optional(),
  dateOfBirth: z.string().nullable().optional(),
  isSuscribed: z.boolean(),
  address: z.string().nullable().optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
})
export const ZContactStatus = ZContact.pick({ status: true })
export const ZCreateContact = ZContact.pick({
  name: true,
  status: true,
}).extend({
  phone: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val === '') return
      if (val) {
        if (!/^\d+$/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'El número de teléfono no es válido.',
          })
        }
      }
    })
    .transform((val) => (val === '' ? undefined : val)),
  email: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val === '' || val === undefined) return
      if (!z.string().email().safeParse(val).success) {
        ctx.addIssue({
          code: 'custom',
          message: 'Correo no es válido.',
        })
      }
    })
    .transform((val) => (val === '' ? undefined : val)),
  address: z.string().optional(),
})
export const ZContactSummary = ZCreateContact.pick({
  email: true,
  phone: true,
  address: true,
})
export const ZContactDetails = ZCreateContact.pick({
  name: true,
}).and(
  z.object({
    dateOfBirth: z.string().optional(),
  })
)
export const ZUpdateDataContact = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  name: z.string().optional(),
})
export const ZAllContacts = z.object({
  data: z.array(ZContact),
  totalPages: z.number(),
  total: z.number(),
  limit: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})

export type customerSchema = z.infer<typeof ZCustomer>
export type contactStatusSchema = z.infer<typeof ZContactStatus>
export type getAllCustomerSchema = z.infer<typeof ZAllCustomer>
export type createCustomerSchema = z.infer<typeof ZCreateCustomer>
export type createContactSchema = z.infer<typeof ZCreateContact>
export type createContactSchemaInput = z.input<typeof ZCreateContact>
export type contactSchema = z.infer<typeof ZContact>
export type getAllContactSchema = z.infer<typeof ZAllContacts>
export type contactSummarySchema = z.infer<typeof ZContactSummary>
export type contactSummarySchemaInput = z.input<typeof ZContactSummary>
export type contactDetailsSchema = z.infer<typeof ZContactDetails>
export type updateDataContactSchema = z.infer<typeof ZUpdateDataContact>
