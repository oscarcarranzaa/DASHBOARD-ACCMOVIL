'use client'
import { newPipelineSchema, ZNewPipeline } from '@/types/crm/pipeline'
import { Button, Input, NumberInput, Textarea } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { pipelineDefaultValues } from './defaultValues'
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { GripVertical, Plus, Scale, Trash } from 'lucide-react'
import RottenDays from './rottenDays'
import { useId } from 'react'
import Spinner from '@/components/icons/spinner'
import { useRouter } from 'next/navigation'
import PipelineStages from './stages'

type TProps = {
  defaultValues?: newPipelineSchema
  isPending: boolean
  onSendData?: (data: newPipelineSchema) => void
}
type THandleDeleteStage = {
  stageId: string
  isNew: boolean
  type?: 'move' | 'delete'
  moveStageId?: string
}
export default function PipelineEditor({
  defaultValues,
  isPending,
  onSendData,
}: TProps) {
  const id = useId()
  const router = useRouter()

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm<newPipelineSchema>({
    resolver: zodResolver(ZNewPipeline),
    defaultValues: defaultValues || pipelineDefaultValues,
  })

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: 'stages',
  })

  const findStageIndex = (stageId: string) =>
    fields.findIndex((field) => field.id === stageId)

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return

    const oldIndex = findStageIndex(active.id as string)
    const newIndex = findStageIndex(over.id as string)
    if (oldIndex !== newIndex) {
      move(oldIndex, newIndex)
    }
  }

  const submitData = (e: newPipelineSchema) => {
    onSendData?.({
      ...e,
      stages: e.stages.map((st) => ({ ...st, id: st.stage_id ?? st.id })),
    })
  }

  const handleDeleteStage = (options: THandleDeleteStage) => {
    const index = findStageIndex(options.stageId)
    if (index === -1) return

    if (options.isNew) {
      remove(index)
      return
    }
    const isDeleteLeads = options.type !== 'move'
    const currentStages = getValues('stages')
    const updatedStages = currentStages.map((stage, i) => {
      if (i !== index) return stage

      return {
        ...stage,
        active: false,
        move_leads_to_stage_id: !isDeleteLeads
          ? options.moveStageId
          : undefined,
        delete_leads: isDeleteLeads,
      }
    })

    setValue('stages', updatedStages)
  }

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div className="flex  justify-between ">
        <div className="min-w-60">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="off"
                variant="bordered"
                label="Nombre del embudo"
                labelPlacement="outside-left"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                isRequired
                placeholder="Mi nuevo embudo"
                maxLength={50}
              />
            )}
          />
        </div>
        <div className="flex gap-5">
          <Button variant="faded" onPress={() => router.back()}>
            Cancelar
          </Button>
          <Button
            color="primary"
            type="submit"
            className={`w-44 ${isPending ? 'pointer-events-auto cursor-not-allowed' : ''}`}
            isDisabled={isPending}
          >
            {isPending ? (
              <Spinner size={24} fill="#fff" />
            ) : (
              ' Guardar los cambios'
            )}
          </Button>
        </div>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        id={id}
      >
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="mt-10 h-full flex gap-2  overflow-x-auto shrink-0 mb-10 ">
            {fields.map((stageField, index) => {
              const { active } = stageField
              if (active === false) return null
              return (
                <PipelineStages
                  key={stageField.id}
                  stageField={stageField}
                  count={stageField._count.leads}
                  index={index}
                  control={control}
                  onRemove={(options) => {
                    handleDeleteStage({
                      stageId: stageField.id,
                      isNew: stageField.is_new === true,
                      type: options.type,
                      moveStageId: options.moveStageId,
                    })
                  }}
                  isDisabled={fields.length <= 1}
                />
              )
            })}

            <div className=" h-[650px] relative max-w-60 flex flex-col items-center   px-2 py-4 rounded-md">
              <h2 className=" text-lg font-semibold text-center mt-16">
                Añadir nueva etapa
              </h2>
              <p className="text-sm text-center mt-3">
                Las etapas del embudo representan los pasos de tu proceso de
                ventas
              </p>
              <Button
                className="mt-8"
                variant="bordered"
                onPress={() =>
                  append({
                    id: crypto.randomUUID(),
                    name: 'Nueva etapa',
                    is_new: true,
                    dealProbability: 100,
                    rottenDays: undefined,
                    description: undefined,
                    stage_id: crypto.randomUUID(),
                    delete_leads: false,
                    move_leads_to_stage_id: undefined,
                    active: true,
                    _count: {
                      leads: 0,
                    },
                  })
                }
              >
                <Plus size={20} /> Nueva etapa
              </Button>
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </form>
  )
}
