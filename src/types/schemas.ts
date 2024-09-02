import { z } from 'zod'

///// MEDIOS
export const images = z.object({
  _id: z.string(),
  key: z.string(),
  src: z.string(),
  width: z.number(),
  height: z.number(),
})

export const media = z.object({
  _id: z.string(),
  mediaId: z.string(),
  title: z.string(),
  url: z.string(),
  type: z.string(),
  format: z.string(),
  see: z.string().optional(),
  size: z.number(),
  key: z.string(),
  user: z.string(),
  images: z.array(images).optional(),
  createdAt: z.string(),
})
export const team = z.object({
  _id: z.string(),
  role: z.string(),
  job: z.string().optional(),
})

export const user = z.object({
  _id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  verify: z.boolean(),
  avatar: media.optional(),
  team: team,
  createdAt: z.string(),
})

export const getMedias = z.object({
  data: z.array(media),
  totalPages: z.number(),
  limit: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})
const mediaUserAvatar = media
  .pick({ _id: true, mediaId: true, images: true })
  .optional()
const mediaUser = user
  .omit({ avatar: true })
  .extend({ avatar: mediaUserAvatar })
const oneMediaTypes = media.omit({ user: true }).extend({ user: mediaUser })

export const getOneMediaData = oneMediaTypes

export type GetMediasSchema = z.infer<typeof getMedias>
export type GetOneMediaSchema = z.infer<typeof getOneMediaData>
export type MediaSchema = z.infer<typeof media>
export type UserSchema = z.infer<typeof user>
