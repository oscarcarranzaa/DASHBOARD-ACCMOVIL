import { string, z } from 'zod'
import { ZProduct, ZProductData, ZProductInfo, ZProductNew } from './products'
import { ZAttributes, ZTerms } from './attributes'
import { ZCategory } from './category'
import { media } from './schemas'

export const ZVariationsPost = z.object({
  id: z.string(),
  productId: z.string().optional().nullable(),
  product: ZProduct.optional().nullable(),
  attributes: z.array(
    ZTerms.pick({ id: true, option: true, image: true, name: true }).extend({
      attribute: ZAttributes.pick({ id: true, type: true, name: true }),
    })
  ),
})
export const ZVariationsInfoPost = z.object({
  id: z.string(),
  productId: z.string().optional().nullable(),
  product: ZProduct.omit({ User: true }).optional().nullable(),
  attributes: z.array(
    ZTerms.pick({ id: true, option: true, image: true, name: true }).extend({
      attribute: ZAttributes.pick({ id: true, type: true, name: true }),
    })
  ),
})
export const ZGetPost = z.object({
  id: z.string(),
  title: z.string(),
  totalStock: z.number(),
  categories: z.array(ZCategory),
  description: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  specifications: z.string().optional().nullable(),
  slug: z.string(),
  status: z.enum(['publish', 'draft']),
  product: ZProductData.nullable().optional(),
  productId: z.string().nullable().optional(),
  type: z.enum(['variable', 'simple']),
  gallery: z.array(media).optional(),
  variations: z.array(ZVariationsInfoPost).optional(),
  youtubeVideoId: z.string().optional().nullable(),
  createdAt: z.string(),
})
export const ZGetOneListPost = ZGetPost.pick({
  id: true,
  title: true,
  categories: true,
  slug: true,
  status: true,
  type: true,
  totalStock: true,
  youtubeVideoId: true,
  Product: true,
  createdAt: true,
}).extend({
  gallery: z.array(string()),
  product: ZProductInfo.nullable().optional(),
  variations: z.array(ZVariationsInfoPost).optional(),
})

export const ZVariatiosSave = z.object({
  id: z.string(),
  product: ZProductNew.optional(),
  attributes: z.string().array(),
})

export const ZSavePost = z.object({
  title: z.string().min(3),
  categories: z.array(string()).optional(),
  description: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  specifications: z.string().optional(),
  status: z.enum(['publish', 'draft']),
  product: ZProductNew.optional().nullable(),
  type: z.enum(['variable', 'simple']),
  gallery: z.string().array().optional(),
  variations: z.array(ZVariatiosSave).optional(),
  videoID: z.string().optional().nullable(),
})

export const ZSaveGetPost = ZSavePost.extend({
  id: z.string(),
  slug: z.string(),
  variations: z.array(string()).optional(),
}).omit({ variations: true })

export const getLisPosts = z.object({
  data: z.array(ZGetOneListPost),
  totalPages: z.number(),
  limit: z.number(),
  total: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})
export type getLisPostsSchema = z.infer<typeof getLisPosts>
export type VariationsAndAttributes = z.infer<typeof ZVariationsInfoPost>
export type PostSchema = z.infer<typeof ZGetPost>
export type SavePostSchema = z.infer<typeof ZSavePost>
export type SaveNewPostSchema = z.infer<typeof ZSaveGetPost>
export type getOneListPostSchema = z.infer<typeof ZGetOneListPost>
