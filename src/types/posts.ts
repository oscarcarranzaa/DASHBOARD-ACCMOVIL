import { string, z } from 'zod'
import { user } from './schemas'
import { ZCategories } from './category'
import { getOneProductType } from './poducts'
import { ZAttributes, ZTerms } from './attributes'

export const ZVariarions = z.object({
  _id: z.string(),
  product: getOneProductType.nullable(),
  attributes: z.array(
    ZTerms.pick({ _id: true, option: true, image: true }).extend({
      attribute: ZAttributes.pick({ _id: true, type: true, name: true }),
    })
  ),
})

export const ZGetPost = z.object({
  _id: z.string(),
  postID: z.string(),
  title: z.string(),
  totalStock: z.number(),
  // categories: z.array(ZCategories),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  specifications: z.string().optional(),
  slug: z.string(),
  status: z.enum(['publish', 'draft']),
  productID: getOneProductType.nullable(),
  type: z.enum(['variable', 'simple']),
  gallery: z.array(string()),
  variations: z.array(ZVariarions), /////
  //date: z.date(),
})

export const getLisPosts = z.object({
  data: z.array(ZGetPost),
  totalPages: z.number(),
  limit: z.number(),
  total: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})

export type getLisPostsSchema = z.infer<typeof getLisPosts>
export type variationsPost = z.infer<typeof ZVariarions>
