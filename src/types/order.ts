import { z } from 'zod'
import { ZProduct, ZProductInfo } from './products'
import { ZCustomer } from './customer'
import { ZCoupon } from './offers'

export const ZOrderItems = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
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
  name: z.string().trim(),
  phone: z.string(),
  country: z.string(),
  state: z.string(),
  documentNumber: z.string(),
  city: z.string(),
  zone: z.string(),
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
  pointsDiscount: z.number().nullable().optional(),
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
  quantity: z.number().min(1).nonnegative(),
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
export const ZCreateShippingInfo = ZShippingInfo.omit({
  id: true,
  orderId: true,
  reference: true,
}).extend({ reference: z.string().optional() })

export const ZOrderItemsProduct = ZOrderItems.merge(
  z.object({
    product: ZProduct.omit({ User: true }),
  })
)
export const ZOrderDetails = ZOrder.omit({ orderItems: true }).merge(
  z.object({
    orderItems: z.array(ZOrderItemsProduct),
    customer: ZCustomer.nullable(),
    coupon: ZCoupon.nullable(),
  })
)
export type orderSchema = z.infer<typeof ZOrder>
export type orderItemsSchema = z.infer<typeof ZOrderItemsProduct>
export type typeOrderItem = z.infer<typeof ZOrderItems>
export type orderDetailsSchema = z.infer<typeof ZOrderDetails>
export type createShippingInfoSchema = z.infer<typeof ZCreateShippingInfo>
export type createOrderSchema = z.infer<typeof ZCreateOrder>
export type contactOrderSchema = z.infer<typeof ZContactOrder>
export type newBillingInfoSchema = z.infer<typeof ZNewBillingInfo>
export type billingInfoSchema = z.infer<typeof ZBillingInfo>
