'use client'
import { getProductImageSchema } from '@/types/poducts'
import { create } from 'zustand'
// Este Store se encarga de manejar los estados de las variaciones y atributos
export const VariationStatus = {
  NEW: 'new',
  DRAFT: 'draft',
} as const

export type TVariations = {
  id: string
  product: getProductImageSchema | null
  status: (typeof VariationStatus)[keyof typeof VariationStatus]
  attributesTerms: {
    id: string
    name: string
  }[]
}

export type TPublishData = {
  title: string
  description: string
  image: string
  gallery: string[]
}
export type StatePublish = {
  variations: TVariations[] | null
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
  publishData: TPublishData | null
}
type Action = {
  setVariation: (variations: StatePublish['variations']) => void
  setAttributes: (attributes: StatePublish['attributes']) => void
  setPublishData: (publishData: StatePublish['publishData']) => void
}

export const usePublishStore = create<StatePublish & Action>((set) => ({
  variations: null,
  attributes: null,
  deletedVariations: [],
  publishData: null,

  setVariation: (newVariation) => set(() => ({ variations: newVariation })),
  setAttributes: (newAttributes) => set(() => ({ attributes: newAttributes })),
  setPublishData: (newPublishData) =>
    set(() => ({ publishData: newPublishData })),
}))
