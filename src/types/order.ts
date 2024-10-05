import { z } from 'zod'

export const ZOrderItems = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  discount: z.number().nullable(),
  total: z.number(),
})

export const ZTransaction = z.object({
  id: z.string(),
  paymentMethod: z.enum(['credit_card', 'bank_transfer']),
  paymentStatus: z.enum(['paid', 'unpaid']),
  paymentDate: z.string().nullable().optional(),
  orderId: z.string(),
})

export const ZShippingInfo = z.object({
  id: z.string(),
  orderId: z.string(),
  name: z.string().nullable().optional(),
  phone: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  reference: z.string().nullable().optional(),
})
export const ZBillingInfo = z.object({
  id: z.string(),
  orderId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  documentNumber: z.string(),
  phone: z.string().optional().nullable(),
  rtn: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
})
export const ZOrder = z.object({
  id: z.string(),
  orderId: z.string(),
  customerId: z.string().nullable(),
  totalAmount: z.number(),
  couponDiscount: z.number().nullable(),
  pointsDiscount: z.number(),
  status: z.enum([
    'pending',
    'processing',
    'cancelled',
    'completed',
    'refund',
    'creating',
  ]),
  deliveryMethod: z.enum(['shipment', 'pickup']),
  note: z.string().nullable(),
  orderItems: z.array(ZOrderItems),
  transaction: ZTransaction.nullable().optional(),
  shippingInfo: ZShippingInfo.optional().nullable(),
  billingInfo: ZBillingInfo.optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})
