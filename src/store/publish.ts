'use client'
import { create } from 'zustand'
// Este Store se encarga de manejar los estados de las variaciones y atributos
type State = {
  variations:
    | {
        id: string
        productID: string
        attribute: {
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
  setVariation: (variations: State['variations']) => void
  setAttributes: (attributes: State['attributes']) => void
}

export const usePublishStore = create<State & Action>((set) => ({
  variations: null,
  attributes: null,
  setVariation: (newVariation) => set(() => ({ variations: newVariation })),
  setAttributes: (newAttributes) => set(() => ({ attributes: newAttributes })),
}))