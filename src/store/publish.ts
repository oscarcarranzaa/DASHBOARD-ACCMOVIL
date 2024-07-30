'use client'
import { selectCategory } from '@/components/category/displayCategory'
import { IUploads } from '@/types'
import { getProductImageSchema } from '@/types/poducts'
import { create } from 'zustand'

export type TPostData = {
  id: string
  title: string
  description?: string
  status: 'publish' | 'draft'
  type: 'simple' | 'variable'
  gallery?: IUploads[]
  video?: string
  categories?: selectCategory
  shortDescription?: string
  desription?: string
  productID?: getProductImageSchema
  specifications?: string
}
const postInitialValue: TPostData = {
  id: 'new',
  title: '',
  type: 'simple',
  status: 'draft',
}
export type TVariations = {
  id: string
  product: getProductImageSchema | null
  status: 'new' | 'draft'
  attributesTerms: {
    id: string
    name: string
  }[]
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
  postData: TPostData
}

type Action = {
  setVariation: (variations: StatePublish['variations']) => void
  setAttributes: (attributes: StatePublish['attributes']) => void
  setPostData: (postData: StatePublish['postData']) => void
  setType: (type: 'simple' | 'variable') => void
  setGallery: (gallery: IUploads[] | undefined) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setShortDescription: (description: string) => void
}

export const usePublishStore = create<StatePublish & Action>((set) => ({
  variations: null,
  attributes: null,
  deletedVariations: [],
  postData: postInitialValue,

  setVariation: (newVariation) => set(() => ({ variations: newVariation })),
  setAttributes: (newAttributes) => set(() => ({ attributes: newAttributes })),
  setPostData: (newPostData) => set(() => ({ postData: newPostData })),
  setType: (type) =>
    set((state) => ({ postData: { ...state.postData, type } })),
  setGallery: (gallery) =>
    set((state) => ({ postData: { ...state.postData, gallery } })),
  setTitle: (title) =>
    set((state) => ({ postData: { ...state.postData, title } })),
  setShortDescription: (shortDescription) =>
    set((state) => ({ postData: { ...state.postData, shortDescription } })),
  setDescription: (description) =>
    set((state) => ({ postData: { ...state.postData, description } })),
}))
