import { z } from 'zod'
import { ZProduct, ZProductInfo } from './products'
import { ZCustomer } from './customer'
import { ZCoupon } from './offers'
import { ZUser } from './users'

export const ZOrderItems = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  price: z.number().nullable().optional(),
  discountPrice: z.number().nullable().optional(),
})
export const ZOrderHistoryChanges = z.object({
  id: z.string(),
  orderId: z.string(),
  userId: z.string().nullable().optional(),
  status: z
    .enum([
      'pending',
      'processing',
      'cancelled',
      'completed',
      'refund',
      'creating',
      'failed',
    ])
    .nullable()
    .optional(),
  type: z.enum(['STATUS', 'MESSAGE', 'IMAGE', 'FILE', 'INFO']),
  message: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  user: ZUser.pick({
    id: true,
    firstName: true,
    lastName: true,
    avatar: true,
    username: true,
  })
    .nullable()
    .optional(),
  createdAt: z.string(),
})
export const ZTransaction = z.object({
  id: z.string(),
  paymentMethod: z.enum([
    'CREDIT_CARD',
    'PAYPAL',
    'BANK_TRANSFER',
    'CASH',
    'OTHER',
  ]),
  totalPaid: z.string(),
  paymentStatus: z.enum([
    'PENDING',
    'COMPLETED',
    'FAILED',
    'CANCELLED',
    'REFUND',
  ]),
  paymentDate: z.string().nullable().optional(),
  orderId: z.string(),
  reference: z.string().nullable().optional(),
  voucherImage: z.string().nullable().optional(),
})

export const ZShippingInfo = z.object({
  id: z.string(),
  orderId: z.string(),
  name: z.string().trim(),
  phone: z.string(),
  country: z.string(),
  state: z.string(),
  orderTrackingUrl: z.string().nullable().optional(),
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
  subTotal: z.number(),
  discountTotal: z.number(),
  couponDiscount: z.number().nullable(),
  pointsDiscount: z.number().nullable().optional(),
  status: z.enum([
    'pending',
    'processing',
    'cancelled',
    'completed',
    'refund',
    'creating',
    'failed',
  ]),
  shippingCost: z.number().nullable(),
  deliveryMethod: z.enum(['shipment', 'pickup']),
  note: z.string().nullable(),
  orderItems: z.array(ZOrderItems),
  transaction: ZTransaction.nullable().optional(),
  shippingInfo: ZShippingInfo.optional().nullable(),
  billingInfo: ZBillingInfo.optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  completedAt: z.string().nullable().optional(),
})
export const ZOrderInfo = ZOrder.omit({
  billingInfo: true,
  shippingInfo: true,
  orderItems: true,
  transaction: true,
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
export const ZAddProductOrder = z.object({
  product: ZProductInfo,
  order: ZOrderInfo,
})

export const ZOrderItemUpdate = z.object({
  item: ZOrderItems,
  order: ZOrderInfo,
})
export const ZOrderCouponAdd = z.object({
  coupon: ZCoupon,
  order: ZOrderInfo,
})
export const ZOrderDetails = ZOrder.omit({ orderItems: true }).merge(
  z.object({
    orderItems: z.array(ZOrderItemsProduct),
    customer: ZCustomer.nullable(),
    coupon: ZCoupon.nullable().optional(),
  })
)

export const ZOrderDetailsRead = ZOrderDetails.merge(
  z.object({ OrderHistory: z.array(ZOrderHistoryChanges) })
)
// Tipo para obtener la orden cuando finalice

export const ZGetOrderSuccess = ZOrder.omit({
  orderItems: true,
  shippingInfo: true,
})
/// Tipo para obtener la lista de las ordenes
const getOrderCell = ZOrder.omit({ orderItems: true }).merge(ZOrderDetails)
export const ZGetOrderList = z.object({
  data: z.array(getOrderCell),
  totalPages: z.number(),
  limit: z.number(),
  total: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})
export const ZUpdateTrackUrl = z.object({
  url: z.string().url('Debe ser un enlace válido.').trim(),
})
export const ZOrderEdit = z.object({
  shippingInfo: ZCreateShippingInfo,
  billingInfo: ZNewBillingInfo,
})
export type orderSchema = z.infer<typeof ZOrder>
export type orderItemsSchema = z.infer<typeof ZOrderItemsProduct>
export type typeOrderItem = z.infer<typeof ZOrderItems>
export type orderDetailsSchema = z.infer<typeof ZOrderDetails>
export type createShippingInfoSchema = z.infer<typeof ZCreateShippingInfo>
export type createOrderSchema = z.infer<typeof ZCreateOrder>
export type contactOrderSchema = z.infer<typeof ZContactOrder>
export type newBillingInfoSchema = z.infer<typeof ZNewBillingInfo>
export type billingInfoSchema = z.infer<typeof ZBillingInfo>
export type addProductOrderSchema = z.infer<typeof ZAddProductOrder>
export type orderItemUpdatedSchema = z.infer<typeof ZOrderItemUpdate>
export type orderInfoSchema = z.infer<typeof ZOrderInfo>
export type orderCouponAddSchema = z.infer<typeof ZOrderCouponAdd>
export type orderListSchema = z.infer<typeof ZGetOrderList>
export type orderCellSchema = z.infer<typeof getOrderCell>
export type orderSuccessSchema = z.infer<typeof ZGetOrderSuccess>
export type orderDetailsRead = z.infer<typeof ZOrderDetailsRead>
export type shippingInfoSchema = z.infer<typeof ZShippingInfo>
export type orderEditShema = z.infer<typeof ZOrderEdit>
