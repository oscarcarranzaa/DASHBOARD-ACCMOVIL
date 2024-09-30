import { string, z } from 'zod'
import { ZProduct } from './products'
import { ZAttributes, ZTerms } from './attributes'
import { ZCategory } from './category'
import { media } from './schemas'

export const ZVariationsPost = z.object({
  id: z.string(),
  productId: z.string().optional().nullable(),
  Product: ZProduct.optional().nullable(),
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
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  specifications: z.string().optional(),
  slug: z.string(),
  status: z.enum(['publish', 'draft']),
  Product: ZProduct.nullable().optional(),
  productId: z.string().nullable().optional(),
  type: z.enum(['variable', 'simple']),
  gallery: z.array(media).optional(),
  variations: z.array(ZVariationsPost).optional(),
  youtubeVideoId: z.string().optional(),
  createdAt: z.string(),
})
export const ZGetOneListPost = ZGetPost.omit({
  gallery: true,
  Product: true,
}).extend({
  gallery: z.array(string()),
  Product: ZProduct.nullable().optional(),
})
export const ZVariatiosSave = z.object({
  productId: z.string().nullable(),
  attributes: z.string().array(),
})

export const ZSavePost = z.object({
  title: z.string().min(3),
  categories: z.array(string()).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  specifications: z.string().optional(),
  status: z.enum(['publish', 'draft']),
  productId: z.string().nullable().optional(),
  type: z.enum(['variable', 'simple']),
  gallery: z.string().array().optional(),
  variations: z.array(ZVariatiosSave).optional(),
  videoID: z.string().optional(),
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
export type VariationsAndAttributes = z.infer<typeof ZVariationsPost>
export type PostSchema = z.infer<typeof ZGetPost>
export type SavePostSchema = z.infer<typeof ZSavePost>
export type SaveNewPostSchema = z.infer<typeof ZSaveGetPost>
