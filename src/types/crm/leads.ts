import { z } from 'zod'
import { ZProduct } from '../products'
import { ZContact } from '../customer'
import { ZUser } from '../users'
import { X } from 'lucide-react'

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
  contactId: z.string(),
  labelId: z.string().optional(),
  status: z.enum(['ARCHIVE', 'PROGRESS', 'ACTIVE', 'DELETED']),
  source: z.enum(['WEB_FORMS', 'INBOX', 'MANUALLY', 'CAMPAIGNS']),
  expectedCloseDate: z.string(),
  value: z.number(),
  products: z.array(ZProduct),
  historyLeads: z.array(ZHistoryLead),
  updatedAt: z.string(),
  createdAt: z.string(),
  contact: ZContact,
  user: ZUser.optional(),
  label: ZLabel.optional(),
})
export const ZNewLead = ZLead.pick({
  title: true,
  expectedCloseDate: true,
  value: true,
  labelId: true,
  source: true,
  userId: true,
  contactId: true,
})

export type leadSchema = z.infer<typeof ZLead>
export type newLeadSchema = z.infer<typeof ZNewLead>
