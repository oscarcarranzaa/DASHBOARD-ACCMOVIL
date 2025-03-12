import { z } from 'zod'
import { ZProduct } from '../products'
import { ZContact } from '../customer'
import { ZUser } from '../users'

export const ZHistoryLead = z.object({
  id: z.string(),
  leadId: z.string(),
  userId: z.string(),
  type: z.enum(['status', 'comment', 'file', 'task', 'ubication']),
  metadata: z.object({}),
  updatedAt: z.string(),
  createdAt: z.string(),
})
export const ZLabel = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  type: z.enum(['LEAD', 'CONTACT', 'DEAL']),
})
export const ZLead = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string().optional(),
  contactId: z.string().nullable().optional(),
  labelId: z.string().optional(),
  status: z.enum(['ARCHIVE', 'PROGRESS', 'ACTIVE', 'DELETED']),
  source: z
    .enum([
      'WEB_FORMS',
      'INBOX',
      'MANUALLY',
      'CAMPAIGNS',
      'STORE',
      'FRIENDS',
      'SOCIAL_MEDIA',
    ])
    .nullable()
    .optional(),
  expectedCloseDate: z.string().nullable().optional(),
  value: z.number().optional(),
  products: z.array(ZProduct),
  historyLeads: z.array(ZHistoryLead),
  updatedAt: z.string(),
  createdAt: z.string(),
  contact: ZContact,
  user: ZUser.optional(),
  label: ZLabel.optional(),
})
export const ZNewLead = ZLead.pick({
  contactId: true,
  title: true,
  expectedCloseDate: true,
  value: true,
  labelId: true,
  source: true,
  userId: true,
}).merge(
  z.object({
    name: z.string().min(2, 'Nombre muy corto'),
    email: z.string().optional(),
    phone: z
      .string()
      .optional()
      .superRefine((val, ctx) => {
        if (val === '') return
        if (val) {
          if (!/^\d+$/.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'El número de teléfono no es válido.',
            })
          }
        }
      })
      .transform((val) => (val === '' ? undefined : val)),
    isNewContact: z.boolean().optional(),
  })
)

export type leadSchema = z.infer<typeof ZLead>
export type newLeadSchema = z.infer<typeof ZNewLead>
