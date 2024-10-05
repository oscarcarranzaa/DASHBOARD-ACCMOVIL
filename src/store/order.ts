'use client'
import { productSchema } from '@/types/products'
import { MediaSchema } from '@/types/schemas'
import { toast } from 'sonner'
import { z } from 'zod'
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
type State = {
  products: productOrder[]
}
type Action = {
  addProduct: (product: productOrder) => void
  incrementProduct: (id: string) => void
  decrementalProduct: (id: string) => void
  deletedProduct: (id: string) => void
}

export const createOrderState = create<State & Action>((set) => ({
  products: [],
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
        // Si el producto no está en la lista, lo agrega
        return { products: [...state.products, newProduct] }
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
}))
