import { z } from 'zod'

export const ZStage = z.object({
  id: z.string(),
  name: z.string().min(2, 'El nombre es muy corto'),
  description: z.string().nullable().optional(),
  pipelineId: z.string(),
  order_N: z.number(),
  dealProbability: z.number(),
  rottenDays: z.number().optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const ZPipeline = z.object({
  id: z.string(),
  name: z.string().min(2, 'El nombre es muy corto'),
  url: z.string(),
  active: z.boolean(),
  stages: z.array(ZStage),
  updatedAt: z.string(),
  createdAt: z.string(),
})
export const ZGetPipelines = z.array(ZPipeline)

export const ZNewPipeline = ZPipeline.pick({
  name: true,
}).and(
  z.object({
    stages: z
      .array(
        ZStage.pick({
          id: true,
          name: true,
          dealProbability: true,
          rottenDays: true,
          description: true,
        }).merge(
          z.object({
            delete_deals: z.boolean().optional(),
            is_new: z.boolean().optional(),
            move_leads_to_stage_id: z.string().optional(),
          })
        )
      )
      .min(1, 'Debes tener al menos 1 etapas'),
  })
)

export type newPipelineSchema = z.infer<typeof ZNewPipeline>
export type pipelineSchema = z.infer<typeof ZPipeline>
export type getAllPipelineSchema = z.infer<typeof ZGetPipelines>
export type stageSchema = z.infer<typeof ZStage>
