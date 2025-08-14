import { z } from 'zod'

export const ZCoupon = z.object({
  id: z.string(),
  code: z.string().max(20).min(3),
  discount: z.number().min(1).max(99),
  minimumExpense: z.number().nullable().optional(),
  maximumExpense: z.number().nullable().optional(),
  usageLimit: z.number().nullable().optional(),
  isActive: z.boolean(),
  userLimit: z.number().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
  createdAt: z.string().optional().nullable(),
})

export const ZCreateCoupon = ZCoupon.pick({
  code: true,
  discount: true,
  expiresAt: true,
  maximumExpense: true,
  minimumExpense: true,
  usageLimit: true,
  userLimit: true,
})
export const ZGetListCoupon = z.object({
  data: z.array(ZCoupon),
  totalPages: z.number(),
  limit: z.number(),
  total: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})
export type couponSchema = z.infer<typeof ZCoupon>
export type listCouponSchema = z.infer<typeof ZGetListCoupon>
export type createCouponSchema = z.infer<typeof ZCreateCoupon>
export type createCouponSchemaInput = z.input<typeof ZCreateCoupon>
