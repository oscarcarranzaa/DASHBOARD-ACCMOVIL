import { z } from 'zod'

export const ZCoupon = z.object({
  id: z.string(),
  code: z
    .string()
    .max(20, 'El máximo de caracteres es de 20.')
    .min(3, 'El mínimo de caracteres es 3.'),
  discount: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Valor mínimo es de 1.').max(99, 'Valor máximo es de 99.')
  ),
  minimumExpense: z.preprocess(
    (val) => (val === '' ? null : Number(val)),
    z.number().nonnegative().nullable().optional()
  ),
  maximumExpense: z.preprocess(
    (val) => (val === '' ? null : Number(val)),
    z.number().nonnegative().nullable().optional()
  ),
  isActive: z.boolean(),
  usageLimit: z.preprocess(
    (val) => (val === '' ? null : Number(val)),
    z.number().nonnegative().nullable().optional()
  ),
  userLimit: z.preprocess(
    (val) => (val === '' ? null : Number(val)),
    z.number().nonnegative().nullable().optional()
  ),
  expiresAt: z.string().optional().nullable(),
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
  .refine(
    (data) => {
      return (
        !data.minimumExpense ||
        !data.maximumExpense ||
        data.minimumExpense < data.maximumExpense
      )
    },
    {
      message:
        'El gasto mínimo no puede ser mayor o igual que el gasto máximo.',
      path: ['minimumExpense'],
    }
  )
  .refine(
    (data) => {
      return (
        !data.userLimit || !data.usageLimit || data.userLimit < data.usageLimit
      )
    },
    {
      message:
        'El límite por usuario no puede ser mayor o igual que el límite de uso.',
      path: ['userLimit'],
    }
  )
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
