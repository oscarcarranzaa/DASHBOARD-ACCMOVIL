import { string, z } from 'zod'
import { getOneProductType, getProductImage, product } from './poducts'
import { ZAttributes, ZTerms } from './attributes'
import { ZCategories, ZCategory } from './category'
import { media } from './schemas'

export const ZVariations = z.object({
  _id: z.string(),
  product: getOneProductType.nullable(),
  attributes: z.array(
    ZTerms.pick({ _id: true, option: true, image: true }).extend({
      attribute: ZAttributes.pick({ _id: true, type: true, name: true }),
    })
  ),
})

export const ZVariationsPost = z.object({
  _id: z.string(),
  product: getProductImage.optional().nullable(),
  attributes: z.array(
    ZTerms.pick({ _id: true, option: true, image: true, name: true }).extend({
      attribute: ZAttributes.pick({ _id: true, type: true, name: true }),
    })
  ),
})
export const ZGetPost = z.object({
  _id: z.string(),
  postID: z.string(),
  title: z.string(),
  totalStock: z.number(),
  categories: z.array(ZCategory),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  specifications: z.string().optional(),
  slug: z.string(),
  status: z.enum(['publish', 'draft']),
  productID: getProductImage.nullable().optional(),
  type: z.enum(['variable', 'simple']),
  gallery: z.array(media).optional(),
  variations: z.array(ZVariationsPost).optional(),
  videoID: z.string().optional(),
  date: z.string(),
})
export const ZGetOneListPost = ZGetPost.omit({
  gallery: true,
  productID: true,
  variations: true,
}).extend({
  gallery: z.array(string()),
  productID: getOneProductType.nullable().optional(),
  variations: z.array(ZVariations).optional(),
})

export const getLisPosts = z.object({
  data: z.array(ZGetOneListPost),
  totalPages: z.number(),
  limit: z.number(),
  total: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})
export const ZVariatiosSave = z.object({
  product: z.string().nullable(),
  attributes: z.string().array(),
})

export const ZSavePost = z.object({
  title: z.string().min(3),
  categories: z.array(string()).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  specifications: z.string().optional(),
  status: z.enum(['publish', 'draft']),
  productID: z.string().nullable().optional(),
  type: z.enum(['variable', 'simple']),
  gallery: z.string().array().optional(),
  variations: z.array(ZVariatiosSave).optional(),
  videoID: z.string().optional(),
})

export const ZSaveGetPost = ZSavePost.extend({
  _id: z.string(),
  slug: z.string(),
  variations: z.array(string()).optional(),
}).omit({ variations: true })

export type getLisPostsSchema = z.infer<typeof getLisPosts>
export type variationsPost = z.infer<typeof ZVariations>
export type VariationsAndAttributes = z.infer<typeof ZVariationsPost>
export type PostSchema = z.infer<typeof ZGetPost>
export type SavePostSchema = z.infer<typeof ZSavePost>
export type SaveNewPostSchema = z.infer<typeof ZSaveGetPost>
