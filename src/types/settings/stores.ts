import { z } from 'zod'

export const ZShedules = z.object({
  id: z.string(),
  branchId: z.string(),
  day: z.number(),
  openTime: z.string().optional().nullable(),
  closeTime: z.string().optional().nullable(),
  isClosed: z.boolean(),
})
export const ZGetStore = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
  status: z.enum(['ACTIVE', 'MAINTENANCE', 'INACTIVE', 'DELETED']),
  image: z.string().nullable().optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
  schedule: z.array(ZShedules),
})
export const ZGetAllStores = z.array(ZGetStore)
export type getStoreSchema = z.infer<typeof ZGetStore>
export type getAllStoresSchema = z.infer<typeof ZGetAllStores>
