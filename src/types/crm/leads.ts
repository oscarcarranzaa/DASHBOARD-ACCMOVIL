import { z } from 'zod'
import { ZProduct } from '../products'
import { ZContact } from '../customer'
import { ZUser, ZUserNameData } from '../users'
import { ZPipeline } from './pipeline'

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
export const ZAllLeadsByPipeline = z.object({
  data: z.array(ZLead),
  totalPages: z.number(),
  total: z.number(),
  limit: z.number(),
  results: z.number(),
  pipeline: ZPipeline,
  pageNumber: z.number(),
})

export const ZOneLead = ZLead.omit({
  products: true,
  label: true,
}).merge(z.object({ pipeline: ZPipeline }))

export const ZLeadSummary = ZLead.pick({
  value: true,
  expectedCloseDate: true,
  title: true,
})

export const ZNote = z.object({
  id: z.string(),
  content: z.string(),
  pinned: z.boolean(),
  userId: z.string().nullable(),
  leadId: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})
export const ZFile = z.object({
  id: z.string(),
  file_size: z.number(),
  url: z.string(),
  remote_key: z.string(),
  name: z.string(),
  file_name: z.string(),
  file_type: z.string(),
  description: z.string().nullable(),
  userId: z.string().nullable(),
  leadId: z.string().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})
export const ZChangeLogs = z.object({
  id: z.string(),
  old_value: z.string().nullable(),
  new_value: z.string().nullable(),
  field_key: z.enum(['STATUS', 'CREATED', 'USER', 'STAGE']),
  source: z.string().nullable(),
  userId: z.string().nullable(),
  leadId: z.string().nullable(),
  createdAt: z.string(),
})

export const ZUserInfoLead = z.object({
  user: ZUserNameData,
})
export const ZChageLogFormatted = ZChangeLogs.merge(
  z.object({
    old_value_formatted: z.string().nullable().optional(),
    new_value_formatted: z.string().nullable().optional(),
  })
)
export const ZHistoryLeads = z.object({
  id: z.string(),
  notes: z.array(ZNote.merge(ZUserInfoLead)).optional(),
  file: z.array(ZFile.merge(ZUserInfoLead)).optional(),
  changeLogs: z.array(ZChageLogFormatted.merge(ZUserInfoLead)).optional(),
})

export type changelogSchema = z.infer<typeof ZChangeLogs>
export type historyLeadSchema = z.infer<typeof ZHistoryLeads>
export type noteSchema = z.infer<typeof ZNote>
export type leadSummarySchema = z.infer<typeof ZLeadSummary>
export type leadSchema = z.infer<typeof ZLead>
export type newLeadSchema = z.infer<typeof ZNewLead>
export type allLeadShema = z.infer<typeof ZAllLeads>
export type allLeadsByPipelineSchema = z.infer<typeof ZAllLeadsByPipeline>
export type getOneLeadShema = z.infer<typeof ZOneLead>
