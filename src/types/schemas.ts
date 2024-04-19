import { z } from 'zod'

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
})

export const team = z.object({
  id: z.string(),
  role: z.string(),
  job: z.string().optional(),
})

export const user = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  verify: z.boolean(),
  avatar: media.optional(),
  team: team,
  createdAt: z.string(),
})

//export type MediaSchema = z.infer<typeof media>
export type UserSchema = z.infer<typeof user>
