'use client'
import { selectCategory } from '@/components/category/displayCategory'
import { IUploads } from '@/types'
import { getProductImageSchema } from '@/types/poducts'
import { PostSchema, VariationsAndAttributes } from '@/types/posts'
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
  productID?: getProductImageSchema | null
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

const initialState: StatePublish = {
  variations: [],
  deletedVariations: [],
  attributes: null,
  postData: {
    id: 'new',
    title: '',
    type: 'simple',
    status: 'draft',
  },
}
type AttributeMap = {
  [key: string]: {
    id: string
    name: string
    terms: {
      id: string
      name: string
    }[]
  }
}

const extractAttributesAndTerms = (
  variationsData: VariationsAndAttributes[]
) => {
  const attributesMap: AttributeMap = {}

  variationsData.forEach((variation) => {
    variation.attributes.forEach((attribute) => {
      const attributeName = attribute.attribute.name
      const attributeID = attribute.attribute._id

      if (!attributesMap[attributeID]) {
        attributesMap[attributeID] = {
          id: attributeID,
          name: attributeName,
          terms: [],
        }
      }

      if (
        !attributesMap[attributeID].terms.some(
          (term) => term.id === attribute._id
        )
      ) {
        attributesMap[attributeID].terms.push({
          id: attribute._id,
          name: attribute.name,
        })
      }
    })
  })

  return Object.values(attributesMap)
}

type Action = {
  reset: () => void
  setData: (data: PostSchema) => void
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
  ...initialState,
  reset: () => set(initialState),
  setData: (data) =>
    set((state) => ({
      postData: {
        ...state.postData,
        title: data.title,
        id: data._id,
        description: data.description,
        shortDescription: data.shortDescription,
        status: data.status,
        type: data.type,
        gallery: data.gallery?.map((img) => {
          return {
            id: img.mediaId,
            mediaIDItem: img._id,
            urlMedia: img.url,
            name: img.title,
            imgURI: img.url,
          }
        }),
        categories: data.categories.map((c) => ({
          _id: c._id,
          name: c.name,
          parent: c.parent,
        })),
        video: data.videoID,
        productID: data.productID,
      },
      attributes: data.variations
        ? extractAttributesAndTerms(data.variations)
        : null,
      variations:
        data.variations?.map((v) => ({
          id: v._id,
          product: v.product ?? null,
          attributesTerms: v.attributes.map((at) => ({
            id: at._id,
            name: at.name,
          })),
        })) ?? [],
    })),
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
