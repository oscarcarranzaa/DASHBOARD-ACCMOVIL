'use client'

import { MediaSchema } from '@/types/schemas'
import { toast } from 'sonner'
import { create } from 'zustand'

type productOrder = {
  id: string
  name: string
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
  name: string
  phone: string
  country: string
  state: string
  city: string
  zone: string
  street: string
  reference?: string
  documentNumber: string
}
type contactOrder = {
  customerId?: string
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
type State = {
  products: productOrder[]
  contact: contactOrder
  shippingInfo: ShippingAddress
  orderNavegation: 'details' | 'contact' | 'shipping' | 'finish'
  orderId?: string | null
}
type Action = {
  addProduct: (product: productOrder) => void
  navegation: (nav: State['orderNavegation']) => void
  setOrderId: (id: string) => void
  incrementProduct: (id: string) => void
  decrementalProduct: (id: string) => void
  deletedProduct: (id: string) => void
  setContact: (contact: contactOrder) => void
  setShippingInfo: (shpi: ShippingAddress) => void
}

export const createOrderState = create<State & Action>((set) => ({
  products: [],
  contact: {
    firstName: '',
    email: '',
    typeContact: 'empty',
    lastName: '',
    documentNumber: '',
    withRtn: false,
  },
  shippingInfo: {
    name: '',
    documentNumber: '',
    phone: '',
    country: 'Honduras',
    state: '',
    city: '',
    zone: '',
    street: '',
    reference: '',
  },
  orderNavegation: 'details',
  orderId: null,
  addProduct: (newProduct) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === newProduct.id
      )

      if (existingProduct) {
        const totalQuantity = existingProduct.quantity + newProduct.quantity
        if (totalQuantity > newProduct.stock) {
          toast.error('No hay suficiente stock disponible.')
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
  setOrderId: (id) =>
    set((state) => {
      return { ...state, orderId: id }
    }),
  incrementProduct: (id) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.id === id
      )
      if (existingProduct) {
        const totalQuantity = existingProduct.quantity + 1
        if (totalQuantity > existingProduct.stock) {
          toast.error('No hay suficiente stock disponible.')
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
        toast.error('No se encontró el producto.')
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
          toast.error('No se permiten cantidades menores a 1')
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
        toast.error('No se encontró el producto.')
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
        toast.error('No se encontró el producto.')
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
}))
