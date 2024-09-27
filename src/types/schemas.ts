import { z } from 'zod'

///// MEDIOS
export const images = z.object({
  id: z.string(),
  key: z.string(),
  src: z.string(),
  type: z.string(),
  width: z.number(),
  height: z.number(),
})
export const ZResponseId = z.object({
  id: z.string(),
})
export const media = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  type: z.string(),
  format: z.string(),
  see: z.string().optional(),
  size: z.number(),
  key: z.string(),
  userId: z.string(),
  qualities: z.array(images),
  createdAt: z.string(),
})
export const team = z.object({
  _id: z.string(),
  role: z.string(),
  job: z.string().optional(),
})
export const role = z.object({
  id: z.string(),
  name: z.string(),
  keys: z.array(z.string()).nullable(),
})
export const user = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().nullable(),
  phone: z.string().nullable(),
  gender: z.enum(['female', 'male', 'others']).nullable(),
  job: z.string().nullable(),
  role: role.nullable(),
  avatar: z.string().nullable(),
  createdAt: z.string(),
})

export const getMedias = z.object({
  data: z.array(media),
  totalPages: z.number(),
  limit: z.number(),
  results: z.number(),
  pageNumber: z.number(),
})

const oneMediaTypes = media.omit({ userId: true }).extend({ user })

export const getOneMediaData = oneMediaTypes
export type resposeIdSchema = z.infer<typeof ZResponseId>
export type GetMediasSchema = z.infer<typeof getMedias>
export type GetOneMediaSchema = z.infer<typeof getOneMediaData>
export type MediaSchema = z.infer<typeof media>
export type UserSchema = z.infer<typeof user>
