'use client'
import { selectCategory } from '@/components/category/displayCategory'
import { IUploads } from '@/types'
import { newProductSchema, productSchema } from '@/types/products'
import { PostSchema, VariationsAndAttributes } from '@/types/posts'
import { create } from 'zustand'

export type TPostData = {
  id: string
  title: string
  description?: string | null
  status: 'publish' | 'draft'
  type: 'simple' | 'variable'
  gallery?: IUploads[]
  youtubeVideoId?: string | null
  categories?: selectCategory[]
  shortDescription?: string | null
  product?: newProductSchema | null
}
export type TVariations = {
  id: string
  product?: newProductSchema | null
  isDeleted?: boolean
  isNew?: boolean
  attributesTerms: {
    id: string
    name: string
  }[]
}

export type StatePublish = {
  variations?: TVariations[]
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
      const attributeID = attribute.attribute.id

      if (!attributesMap[attributeID]) {
        attributesMap[attributeID] = {
          id: attributeID,
          name: attributeName,
          terms: [],
        }
      }

      if (
        !attributesMap[attributeID].terms.some(
          (term) => term.id === attribute.id
        )
      ) {
        attributesMap[attributeID].terms.push({
          id: attribute.id,
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
  setAttributes: (attributes: StatePublish['attributes']) => void
  setPostData: (postData: StatePublish['postData']) => void
  setType: (type: 'simple' | 'variable') => void
  setGallery: (gallery: IUploads[] | undefined) => void
  setTitle: (title: string) => void
  deleteVariation: (id: string) => void
  restoreVariation: (id: string) => void
  setDescription: (description: string) => void
  setShortDescription: (description: string) => void
  setPriceVariation: ({
    price,
    variationId,
  }: {
    price: string
    variationId: string
  }) => void
  setPriceDiscount: ({
    discount,
    variationId,
  }: {
    discount: string
    variationId: string
  }) => void
  setCagories: (categories: selectCategory[]) => void
  setVideo: (video?: string) => void
  setProductVariation: ({
    product,
    variationId,
  }: {
    product: TVariations['product']
    variationId: string
  }) => void
  setVariationImage: ({
    image,
    variationId,
  }: {
    image?: IUploads
    variationId: string
  }) => void
  setProduct: (product?: newProductSchema | null) => void
}

export const usePublishStore = create<StatePublish & Action>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setData: (data) =>
    set((state) => ({
      postData: {
        ...state.postData,
        id: data.id,
        title: data.title,
        description: data.description,
        shortDescription: data.shortDescription,
        status: data.status,
        type: data.type,
        gallery: data.gallery?.map((img) => {
          return {
            id: img.id,
            urlMedia: img.url,
            name: img.title,
            imgURI: img.url,
          }
        }),
        categories: data.categories.map((c) => ({
          id: c.id,
          name: c.name,
          parent: c.parentId,
        })),
        productId: data.productId,
        youtubeVideoId: data.youtubeVideoId,
        product: {
          sku: data.product?.sku ?? '',
          barCode: data.product?.barCode ?? '',
          price: data.product?.price.toString() ?? '',
          discountPrice: data.product?.discountPrice?.toString() ?? '',
          startDiscount: data.product?.startDiscount ?? '',
          endDiscount: data.product?.endDiscount ?? '',
          stock: data.product?.stock.toString() ?? '',
          image: data.product?.media
            ? {
                id: data.product.media.id,
                urlMedia: data.product.media.url,
                imgURI: data.product.media.qualities[0].src,
                name: data.product.media.title,
              }
            : undefined,
        },
      },
      attributes: data.variations
        ? extractAttributesAndTerms(data.variations)
        : null,
      variations:
        data.variations?.map((v) => ({
          id: v.id,
          isDeleted: false,
          isNew: false,
          productId: v.productId,
          product: {
            sku: v.product?.sku ?? '',
            barCode: v.product?.barCode ?? '',
            price: v.product?.price.toString() ?? '',
            discountPrice: v.product?.discountPrice?.toString() ?? '',
            startDiscount: v.product?.startDiscount ?? '',
            endDiscount: v.product?.endDiscount ?? '',
            stock: v.product?.stock.toString() ?? '',
            image: v.product?.media
              ? {
                  id: v.product.media.id,
                  urlMedia: v.product.media.url,
                  imgURI: v.product.media.qualities[1].src,
                  name: v.product.media.title,
                }
              : undefined,
          },
          attributesTerms: v.attributes.map((at) => ({
            id: at.id,
            name: at.name,
          })),
        })) ?? [],
    })),
  setProduct: (product) =>
    set((state) => ({ postData: { ...state.postData, product } })),
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
  setProductVariation: ({ product, variationId }) =>
    set((state) => {
      const { variations } = state
      const saveVariation = variations?.map((v) => {
        const isVariation = v.id === variationId
        if (isVariation) {
          return { ...v, product: product }
        }
        return v
      })
      return { ...state, variations: saveVariation }
    }),
  setVariationImage: ({ variationId, image }) =>
    set((state) => {
      const { variations } = state
      const variation = variations?.map((v) => {
        const isVariation = v.id === variationId

        const productImage = { ...v.product, image }
        if (isVariation) {
          return { ...v, product: productImage }
        }
        return v
      })
      return { ...state, variations: variation }
    }),
  setPriceVariation: ({ price, variationId }) =>
    set((state) => ({
      ...state,
      variations: state.variations?.map((v) =>
        v.id === variationId ? { ...v, product: { ...v.product, price } } : v
      ),
    })),
  setPriceDiscount: ({ discount, variationId }) =>
    set((state) => ({
      ...state,
      variations: state.variations?.map((v) =>
        v.id === variationId
          ? { ...v, product: { ...v.product, discountPrice: discount } }
          : v
      ),
    })),
  setCagories: (categories) =>
    set((state) => ({ postData: { ...state.postData, categories } })),
  deleteVariation: (id) =>
    set((state) => {
      const { variations } = state
      const delVariation = variations?.map((v) => {
        const isDraft = v.id === id
        if (isDraft) {
          return { ...v, isDeleted: isDraft }
        }
        return v
      })
      return { ...state, variations: delVariation }
    }),
  restoreVariation: (id) =>
    set((state) => {
      const { variations } = state
      const restoreVariation = variations?.map((v) => {
        const isDraft = v.id === id
        if (isDraft) {
          return { ...v, isDeleted: !isDraft }
        }
        return v
      })
      return { ...state, variations: restoreVariation }
    }),
  setVideo: (youtubeVideoId) =>
    set((state) => ({ postData: { ...state.postData, youtubeVideoId } })),
}))
