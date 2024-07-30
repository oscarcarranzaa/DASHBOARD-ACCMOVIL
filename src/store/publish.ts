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
  categories?: selectCategory[]
  shortDescription?: string
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
  attributesTerms: {
    id: string
    name: string
  }[]
}
export interface ItemsVariations extends TVariations {
  status: 'draft' | 'new'
}
;[]

export type StatePublish = {
  variations?: TVariations[]
  deletedVariations?: ItemsVariations[]
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
  setDeleteVariations: (deletedVariations?: ItemsVariations[]) => void
  setAttributes: (attributes: StatePublish['attributes']) => void
  setPostData: (postData: StatePublish['postData']) => void
  setType: (type: 'simple' | 'variable') => void
  setGallery: (gallery: IUploads[] | undefined) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setShortDescription: (description: string) => void
  setCagories: (categories: selectCategory[]) => void
  setVideo: (video?: string) => void
  setProductID: (productID?: getProductImageSchema) => void
}

export const usePublishStore = create<StatePublish & Action>((set) => ({
  attributes: null,
  postData: postInitialValue,
  setProductID: (productID) =>
    set((state) => ({ postData: { ...state.postData, productID } })),
  setVariation: (newVariation) => set(() => ({ variations: newVariation })),
  setDeleteVariations: (deletedVariations) =>
    set(() => ({ deletedVariations: deletedVariations })),
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
  setCagories: (categories) =>
    set((state) => ({ postData: { ...state.postData, categories } })),
  setVideo: (video) =>
    set((state) => ({ postData: { ...state.postData, video } })),
}))
