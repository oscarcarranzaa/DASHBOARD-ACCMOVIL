import { z } from 'zod'
import { ZProduct } from '../products'
import { ZContact } from '../customer'
import { ZUser } from '../users'
import { ZPipeline } from './pipeline'

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
  userId: z.string().nullable().optional(),
  contactId: z.string().nullable().optional(),
  labelId: z.string().nullable().optional(),
  pipelineId: z.string(),
  stageId: z.string(),
  status: z.enum(['ACTIVE', 'DELETED', 'ARCHIVE', 'LOST', 'WON']),
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
  value: z.number().nullable().optional(),
  products: z.array(ZProduct).nullable().optional(),
  historyLeads: z.array(ZHistoryLead).nullable().optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
  contact: ZContact,
  user: ZUser.nullable().optional(),
  label: ZLabel.nullable().optional(),
})
export const ZNewLead = ZLead.pick({
  contactId: true,
  title: true,
  expectedCloseDate: true,
  value: true,
  labelId: true,
  pipelineId: true,
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

export const ZAllLeads = z.object({
  data: z.array(ZLead),
  totalPages: z.number(),
  total: z.number(),
  limit: z.number(),
  results: z.number(),
  pipelines: z.array(ZPipeline),
  pageNumber: z.number(),
})

export type leadSchema = z.infer<typeof ZLead>
export type newLeadSchema = z.infer<typeof ZNewLead>
export type allLeadShema = z.infer<typeof ZAllLeads>
