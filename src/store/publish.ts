'use client'
import { getProductImageSchema } from '@/types/poducts'
import { create } from 'zustand'
// Este Store se encarga de manejar los estados de las variaciones y atributos
export type StatePublish = {
  variations:
    | {
        id: string
        product: getProductImageSchema | null
        attributesTerms: {
          id: string
          name: string
        }[]
      }[]
    | null
  attributes:
    | {
        id: string
        name: string
        terms: {
          id: string
          name: string
        }[]
      }[]
    | null
}
type Action = {
  setVariation: (variations: StatePublish['variations']) => void
  setAttributes: (attributes: StatePublish['attributes']) => void
}

export const usePublishStore = create<StatePublish & Action>((set) => ({
  variations: null,
  attributes: null,
  setVariation: (newVariation) => set(() => ({ variations: newVariation })),
  setAttributes: (newAttributes) => set(() => ({ attributes: newAttributes })),
}))
