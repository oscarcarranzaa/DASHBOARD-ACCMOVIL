'use client'

import { orderDetailsSchema } from '@/types/order'
import { MediaSchema } from '@/types/schemas'
import { addToast } from '@heroui/react'
import { create } from 'zustand'

type productOrder = {
  id: string
  name: string
  isSaved: boolean
  price: number
  quantity: number
  stock: number
  sku?: string | null
  media?: MediaSchema | null
  discountPrice?: number | null
  startDiscount?: string | null
  endDiscount?: string | null
}

type ShippingAddress = {
  name: string | null
  phone: string | null
  country: string
  state: string
  city: string
  zone: string
  street: string
  reference?: string | null
  documentNumber: string | null
}
type OrderInfo = {
  id: string
  subTotal: number
  discountTotal: number
  totalAmount: number
  updatedAt: string
  createdAt: string
  status:
    | 'pending'
    | 'processing'
    | 'cancelled'
    | 'completed'
    | 'refund'
    | 'creating'
    | 'failed'
  deliveryMethod: 'shipment' | 'pickup'
  shippingCost?: number | null
  couponDiscount?: number | null
  pointsDiscount?: number | null
}
type contactOrder = {
  customerId?: string | null
  firstName?: string | null
  lastName?: string | null
  email: string
  documentNumber?: string | null
  typeContact: 'customer' | 'guest' | 'empty'
  phone?: string | null
  rtn?: string | null
  withRtn: boolean
  companyPhone?: string | null
  companyName?: string | null
  company?: string | null
}
type couponCode = {
  code: string
  discount: number
  maximumExpense?: number | null
  minimumExpense?: number | null
}
type State = {
  products: productOrder[]
  contact: contactOrder
  shippingInfo: ShippingAddress
  orderInfo?: OrderInfo
  coupon?: couponCode
  orderNavegation: 'details' | 'contact' | 'shipping' | 'finish' | 'finalice'
  completedNavegation: string[]
  orderSuccessId?: string | null
}
type Action = {
  addProduct: (product: productOrder) => void
  setIsSaveProduct: (id: string) => void
  navegation: (nav: State['orderNavegation']) => void
  addCoupon: (coupon: couponCode) => void
  removeCoupon: () => void
  setOrderSuccessId: (id: string) => void
  incrementProduct: (id: string) => void
  decrementalProduct: (id: string) => void
  deletedProduct: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  setContact: (contact: contactOrder) => void
  setShippingInfo: (shpi: ShippingAddress) => void
  resetContact: () => void
  setCompletedNavegation: (nav: string) => void
  setOrderData: (data: orderDetailsSchema) => void
  setOrderInfo: (data: OrderInfo) => void
  reset: () => void
}

export const createOrderState = create<State & Action>((set) => ({
  products: [],
  completedNavegation: ['details'],
  contact: {
    firstName: '',
    email: '',
    typeContact: 'empty',
    lastName: '',
    documentNumber: '',
    withRtn: false,
  },
  shippingInfo: {
    name: null,
    documentNumber: null,
    phone: null,
    country: 'Honduras',
    state: '',
    city: '',
    zone: '',
    street: '',
    reference: '',
  },
  orderNavegation: 'details',
  addProduct: (newProduct) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      )
      if (existingProduct) {
        const totalQuantity = existingProduct.quantity + newProduct.quantity
        if (totalQuantity > newProduct.stock) {
          addToast({
            color: 'danger',
            variant: 'bordered',
            timeout: 5000,
            title: 'No hay suficiente stock disponible',
          })

          return state
        }
        return {
          products: state.products.map((product) =>
            product.id === newProduct.id
              ? { ...product, quantity: product.quantity + newProduct.quantity }
              : product
          ),
        }
      } else {
        return { products: [...state.products, newProduct] }
      }
    }),
  navegation: (nav) =>
    set((state) => {
      return { ...state, orderNavegation: nav }
    }),
  setOrderSuccessId: (id) =>
    set((state) => {
      return { ...state, orderSuccessId: id }
    }),
  setIsSaveProduct: (id) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === id
      )
      if (existingProduct) {
        return {
          products: state.products.map((product) =>
            product.id === id ? { ...product, isSaved: true } : product
          ),
        }
      } else {
        addToast({
          color: 'danger',
          variant: 'bordered',
          timeout: 5000,
          title: 'No se encontró el producto',
        })

        return { products: state.products }
      }
    }),
  setCompletedNavegation: (nav) =>
    set((state) => {
      const findNavegation = state.completedNavegation.find((n) => n === nav)

      if (findNavegation) {
        return { ...state }
      }
      return {
        ...state,
        completedNavegation: [...state.completedNavegation, nav],
      }
    }),
  setQuantity: (id, q) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === id
      )
      if (existingProduct) {
        const totalQuantity = q
        if (totalQuantity > existingProduct.stock) {
          addToast({
            color: 'danger',
            variant: 'bordered',
            timeout: 5000,
            title: 'No hay suficiente stock disponible',
          })

          return state
        }
        return {
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, quantity: totalQuantity }
              : product
          ),
        }
      } else {
        addToast({
          color: 'danger',
          variant: 'bordered',
          timeout: 5000,
          title: 'No se encontró el producto',
        })
        return { products: state.products }
      }
    }),
  incrementProduct: (id) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === id
      )
      if (existingProduct) {
        const totalQuantity = existingProduct.quantity + 1
        if (totalQuantity > existingProduct.stock) {
          addToast({
            color: 'danger',
            variant: 'bordered',
            timeout: 5000,
            title: 'No hay suficiente stock disponible',
          })
          return state
        }
        return {
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        }
      } else {
        addToast({
          color: 'danger',
          variant: 'bordered',
          timeout: 5000,
          title: 'No se encontró el producto',
        })

        return { products: state.products }
      }
    }),
  decrementalProduct: (id) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === id
      )
      if (existingProduct) {
        const totalQuantity = existingProduct.quantity - 1
        if (totalQuantity <= 0) {
          addToast({
            color: 'danger',
            variant: 'bordered',
            timeout: 5000,
            title: 'No se permiten cantidades menores a 1',
          })
          return state
        }
        return {
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
        }
      } else {
        addToast({
          color: 'danger',
          variant: 'bordered',
          timeout: 5000,
          title: 'No se encontró el producto',
        })
        return state
      }
    }),
  deletedProduct: (id) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === id
      )
      if (existingProduct) {
        return {
          products: state.products.filter((product) => product.id !== id),
        }
      } else {
        addToast({
          color: 'danger',
          variant: 'bordered',
          timeout: 5000,
          title: 'No se encontró el producto',
        })
        return state
      }
    }),
  setContact: (contact) =>
    set((state) => {
      return { ...state, contact }
    }),

  setShippingInfo: (shpi) =>
    set((state) => {
      return { ...state, shippingInfo: shpi }
    }),
  addCoupon: (coupon) =>
    set((state) => {
      return { ...state, coupon }
    }),
  removeCoupon: () =>
    set((state) => {
      return { ...state, coupon: undefined }
    }),
  setOrderInfo: (info) =>
    set((state) => {
      return { ...state, orderInfo: info }
    }),
  reset: () =>
    set(() => ({
      products: [],
      completedNavegation: ['details'],
      orderInfo: undefined,
      orderNavegation: 'details',
      contact: {
        firstName: '',
        email: '',
        typeContact: 'empty',
        lastName: '',
        documentNumber: '',
        withRtn: false,
      },
      shippingInfo: {
        name: null,
        documentNumber: null,
        phone: null,
        country: 'Honduras',
        state: '',
        city: '',
        zone: '',
        street: '',
        reference: '',
      },
    })),
  resetContact: () =>
    set(() => ({
      contact: {
        firstName: '',
        email: '',
        typeContact: 'empty',
        lastName: '',
        documentNumber: '',
        withRtn: false,
      },
    })),

  // Setear los datos si la orden ya existe
  setOrderData: (order) =>
    set((stateOrder) => {
      // Mapeamos los productos de la orden
      let completedNav: State['orderNavegation'][] | [] = ['details']
      const products = order.orderItems.map((p) => {
        const {
          id,
          name,
          price,
          stock,
          sku,
          media,
          discountPrice,
          startDiscount,
          endDiscount,
        } = p.product
        const quantity = p.quantity
        return {
          id,
          name,
          price,
          stock,
          sku,
          isSaved: true,
          media,
          discountPrice,
          startDiscount,
          endDiscount,
          quantity,
        }
      })

      // Actualizamos los datos de contacto si existen
      let contact = stateOrder.contact
      if (order.billingInfo) {
        completedNav = [...completedNav, 'contact']
        const {
          firstName,
          email,
          lastName,
          documentNumber,
          phone,
          rtn,
          companyPhone,
          companyName,
          company,
        } = order.billingInfo
        const customerId = order.customerId
        const withRtn = !!rtn
        const typeContact: 'customer' | 'guest' | 'empty' = customerId
          ? 'customer'
          : 'guest'
        contact = {
          customerId,
          firstName,
          email,
          lastName,
          documentNumber,
          phone,
          rtn,
          companyPhone,
          companyName,
          company,
          withRtn,
          typeContact,
        }
      }
      // Actualizamos los datos de envío si existen
      let shippingInfo = stateOrder.shippingInfo
      if (order.shippingInfo) {
        completedNav = [...completedNav, 'shipping']
        const {
          name,
          phone,
          country,
          state,
          city,
          zone,
          street,
          reference,
          documentNumber,
        } = order.shippingInfo
        const shippingDocumentNumber =
          documentNumber ?? order.billingInfo?.documentNumber
        shippingInfo = {
          name,
          phone,
          country,
          state,
          city,
          zone,
          street,
          reference,
          documentNumber: shippingDocumentNumber,
        }
      }

      // Actualizamos el cupón si existe
      let coupon = stateOrder.coupon
      if (order.coupon) {
        const { code, discount, maximumExpense, minimumExpense } = order.coupon
        coupon = { code, discount, maximumExpense, minimumExpense }
      }

      const orderInfo = {
        id: order.id,
        subTotal: order.subTotal,
        totalAmount: order.totalAmount,
        discountTotal: order.discountTotal,
        updatedAt: order.updatedAt,
        createdAt: order.createdAt,
        status: order.status,
        deliveryMethod: order.deliveryMethod,
        shippingCost: order.shippingCost,
        couponDiscount: order.couponDiscount,
        pointsDiscount: order.pointsDiscount,
      }
      // Devolvemos el nuevo estado actualizado
      return {
        ...stateOrder,
        orderInfo,
        completedNavegation: completedNav,
        products, // Actualizamos los productos
        contact, // Actualizamos la información de contacto
        shippingInfo, // Actualizamos la información de envío
        coupon, // Actualizamos el cupón
        orderId: order.id, // Actualizamos el ID de la orden
      }
    }),
}))
