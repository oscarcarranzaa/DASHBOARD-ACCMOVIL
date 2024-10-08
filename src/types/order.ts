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
  email: z.string().email('Debe ser un correo electronico'),
  documentNumber: z.string(),
  phone: z.string().max(8, 'Telefono no válido').min(8, 'Teléfono no válido'),
  rtn: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  companyPhone: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
})
export const ZNewBillingInfo = ZBillingInfo.pick({
  firstName: true,
  lastName: true,
  email: true,
  documentNumber: true,
  phone: true,
}).merge(
  z.object({
    rtn: z.string().optional(),
    companyName: z.string().optional(),
    companyPhone: z.string().optional(),
    company: z.string().optional(),
  })
)
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

const ZProductsOrder = z.object({
  id: z.string(),
  quantity: z.number(),
})
const ZContactOrder = z.object({
  customerId: z.string().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  documentNumber: z.string(),
  phone: z.string(),
  rtn: z.string().optional().nullable(),
  companyPhone: z.string().nullable().optional(),
  companyName: z.string().nullable().optional(),
  company: z.string().optional().nullable(),
})
export const ZCreateOrder = z.object({
  products: z.array(ZProductsOrder),
  billingInfo: ZContactOrder,
})

export type createOrderSchema = z.infer<typeof ZCreateOrder>
export type newBillingInfoSchema = z.infer<typeof ZNewBillingInfo>
