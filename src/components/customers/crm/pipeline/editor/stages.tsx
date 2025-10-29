'use client'
import { newPipelineSchema } from '@/types/crm/pipeline'
import { useSortable } from '@dnd-kit/sortable'
import {
  Button,
  Input,
  NumberInput,
  Textarea,
  useDisclosure,
} from '@heroui/react'
import { GripVertical, Scale, Trash } from 'lucide-react'
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
} from 'react-hook-form'
import RottenDays from './rottenDays'
import AlertDeleteStage, { TOnDelete } from './alertDeleteStage'

type TProps = {
  stageField: FieldArrayWithId<newPipelineSchema['stages']>
  index: number
  control: Control<newPipelineSchema>
  onRemove: (options: TOnDelete) => void
  isDisabled: boolean
  count: number
}
export default function PipelineStages({
  stageField,
  index,
  control,
  onRemove,
  isDisabled,
  count,
}: TProps) {
  const disclosure = useDisclosure()
  const { name, is_new, stage_id } = control._formValues.stages[index] as {
    name: string
    id: string
    is_new?: boolean
    stage_id: string
  }
  return (
    <>
      <AlertDeleteStage
        {...disclosure}
        title={name}
        onDelete={onRemove}
        stages={control._formValues.stages}
        count={count}
        id={stage_id}
        is_new={is_new}
      />
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
                      <p className="text-zinc-500 text-sm">{field.value}%</p>
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
                  onChange={(e) => onChange(Number(e))}
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
              className="w-full text-xs pointer-events-auto data-disabled:cursor-not-allowed"
              color="danger"
              variant="flat"
              isDisabled={isDisabled}
              onPress={disclosure.onOpen}
            >
              <Trash size={14} />
              Eliminar etapa
            </Button>
          </div>
        </div>
      </SlideCard>
    </>
  )
}

export function SlideCard({
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
