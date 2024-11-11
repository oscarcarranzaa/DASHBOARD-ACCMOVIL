import { z } from 'zod'

export const ZComment = z.object({
  comment: z.string(),
})

export type historyCommentSchema = z.infer<typeof ZComment>
