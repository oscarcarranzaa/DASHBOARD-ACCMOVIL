'use client'
import { newPipelineSchema, ZNewPipeline } from '@/types/crm/pipeline'
import {
  addToast,
  Button,
  Input,
  NumberInput,
  Textarea,
  toast,
} from '@heroui/react'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPipeline } from '@/api/crm'
import Spinner from '@/components/icons/spinner'
import { useRouter } from 'next/navigation'

export default function PipelineEditor() {
  const id = useId()
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<newPipelineSchema>({
    resolver: zodResolver(ZNewPipeline),
    defaultValues: pipelineDefaultValues,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: addPipeline,
    onSuccess: (succ) => {
      queryClient.invalidateQueries({ queryKey: ['pipelines'] })
      addToast({
        title: 'Nuevo embudo creado',
        color: 'success',
        timeout: 5000,
        variant: 'bordered',
      })
      router.push('/dash/embudo')
    },
    onError: (err) => {
      addToast({
        title: 'Ocurrió un error',
        color: 'danger',
        description: err.message,
        timeout: 5000,
        variant: 'bordered',
      })
    },
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'stages',
  })

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return

    const oldIndex = fields.findIndex((field) => field.id === active.id)
    const newIndex = fields.findIndex((field) => field.id === over.id)
    if (oldIndex !== newIndex) {
      move(oldIndex, newIndex)
    }
  }

  const submitData = (e: newPipelineSchema) => {
    mutate(e)
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
          <div className="mt-10 h-full flex gap-2  overflow-x-auto flex-shrink-0 ">
            {fields.map((stageField, index) => {
              return (
                <SlideCard key={stageField.id} id={stageField.id}>
                  <div className=" h-[650px] relative max-w-60  bg-gray-100 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 px-2 py-4 rounded-md">
                    <SortableItem id={stageField.id}>
                      <div className="flex  justify-between items-center border-b border-zinc-300 pb-5 dark:border-zinc-600    ">
                        <div className="flex-none">
                          <Controller
                            control={control}
                            name={`stages.${index}.name`}
                            render={({ field }) => (
                              <p className=" h-6 line-clamp-2 break-words whitespace-normal max-w-52">
                                {field.value}
                              </p>
                            )}
                          />
                          <div className="flex gap-1">
                            <Scale size={18} stroke="#666" />
                            <Controller
                              control={control}
                              name={`stages.${index}.dealProbability`}
                              render={({ field }) => (
                                <p className="text-zinc-500 text-sm">
                                  {field.value}%
                                </p>
                              )}
                            />
                          </div>
                        </div>
                        <div>
                          <GripVertical />
                        </div>
                      </div>
                    </SortableItem>
                    <div className="mt-10 flex flex-col gap-y-5 ">
                      <Controller
                        control={control}
                        name={`stages.${index}.name`}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <Input
                            value={value ?? undefined}
                            onChange={onChange}
                            variant="faded"
                            label="Nombre"
                            autoComplete="off"
                            isInvalid={!!error}
                            errorMessage={error?.message}
                            labelPlacement="outside"
                            isRequired
                            placeholder="Nombre de etapa"
                            maxLength={50}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`stages.${index}.dealProbability`}
                        render={({ field: { value, onChange } }) => (
                          <NumberInput
                            value={value}
                            onChange={onChange}
                            variant="faded"
                            label="Probabilidad"
                            maxValue={100}
                            isRequired
                            labelPlacement="outside"
                            placeholder="50% en porcentage"
                            maxLength={50}
                          />
                        )}
                      />

                      <div>
                        <Controller
                          control={control}
                          name={`stages.${index}.rottenDays`}
                          render={({ field: { value, onChange } }) => (
                            <RottenDays value={value} onChange={onChange} />
                          )}
                        />
                      </div>
                      <Controller
                        control={control}
                        name={`stages.${index}.description`}
                        render={({ field: { value, onChange } }) => (
                          <Textarea
                            value={value ?? undefined}
                            onChange={onChange}
                            variant="faded"
                            label="Descripción"
                            labelPlacement="outside"
                            placeholder="Pequeña descripción de la etapa."
                            maxLength={50}
                          />
                        )}
                      />
                    </div>
                    <div className="absolute left-2 right-2 bottom-5 ">
                      <Button
                        className="w-full text-xs pointer-events-auto data-[disabled]:cursor-not-allowed"
                        color="danger"
                        variant="flat"
                        isDisabled={fields.length <= 1}
                        onPress={() => {
                          if (fields.length >= 1) {
                            remove(index)
                          }
                        }}
                      >
                        <Trash size={14} />
                        Eliminar etapa
                      </Button>
                    </div>
                  </div>
                </SlideCard>
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

function SortableItem({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { attributes, listeners, isDragging } = useSortable({ id })

  return (
    <div
      {...attributes}
      {...listeners}
      className={isDragging ? 'cursor-grabbing' : 'cursor-grab'}
    >
      {children}
    </div>
  )
}

function SlideCard({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: transform ? `translateX(${transform.x}px) ` : undefined,
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}
