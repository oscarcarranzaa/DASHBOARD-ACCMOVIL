import { deleteOneLead, getLeadCountStage } from '@/api/crm'
import { allLeadShema } from '@/types/crm/leads'
import { newPipelineSchema } from '@/types/crm/pipeline'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Alert,
  addToast,
  closeAll,
  Spinner,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
} from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AlarmClock, CalendarClock, Trash } from 'lucide-react'
import { useState } from 'react'

export type TOnDelete = {
  type?: 'move' | 'delete'
  moveStageId?: string
}

type TProps = {
  title: string
  onOpenChange: () => void
  isOpen: boolean
  onDelete: (options: TOnDelete) => void
  count: number
  stages: newPipelineSchema['stages']
  onClose: () => void
  is_new?: boolean
  id: string
}

export default function AlertDeleteStage({
  id,
  title,
  onOpenChange,
  isOpen,
  onDelete,
  count,
  stages,
  is_new,
  onClose,
}: TProps) {
  const [selected, setSelected] = useState<'move' | 'delete' | undefined>(
    'move'
  )

  const [selectionValue, setSelectionValue] = useState<string | undefined>()

  const { data, isPending } = useQuery({
    queryKey: ['stage', id],
    queryFn: () => getLeadCountStage({ id }),
    refetchOnWindowFocus: false,
    enabled: !is_new && isOpen,
  })

  const stageOptions = stages
    .map((stage) => ({
      key: stage.stage_id,
      label: stage.name,
      isDisabled: stage.active,
    }))
    .filter((stage) => stage.key !== id && stage.isDisabled)

  const isMoveWithoutSelection =
    !is_new && selected === 'move' && !selectionValue

  const hasCount = count > 0

  const disableSubmit = isMoveWithoutSelection && hasCount

  const leadsCount = data?.leads_count ?? count
  const showAction = !is_new && leadsCount > 0

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      size="lg"
      classNames={{
        backdrop: 'z-100000',
        wrapper: 'z-100000',
      }}
    >
      <ModalContent>
        <ModalHeader>¿Eliminar etapa {title}?</ModalHeader>
        <ModalBody>
          <p className="text-sm">
            {leadsCount > 0
              ? 'Antes de eliminar esta etapa del embudo, especifica lo siguiente:'
              : 'Aún no tienes clientes en esta etapa.'}
          </p>

          {showAction && data && (
            <>
              <p className=" text-base font-semibold">
                ¿Que te gustaría hacer con los clientes de esta etapa?
              </p>
              <RadioGroup
                aria-label="Selecciona una opción"
                value={selected}
                onValueChange={(value) =>
                  setSelected(value as 'move' | 'delete')
                }
              >
                <Radio value="move">Mover a otra etapa</Radio>
                <Radio value="delete">Eliminar clientes de esta etapa</Radio>
              </RadioGroup>
              {selected === 'move' && (
                <Select
                  aria-label="Selecciona una etapa"
                  label="Selecciona una etapa"
                  placeholder="Seleccionar"
                  variant="bordered"
                  isRequired
                  popoverProps={{
                    shouldBlockScroll: true,
                    classNames: {
                      base: 'before:bg-default-200',
                      content: 'p-0 border-small border-divider bg-background',
                    },
                  }}
                  className="mt-5 mb-5"
                  selectedKeys={selectionValue ? [selectionValue] : []}
                  items={stageOptions}
                  onSelectionChange={(value) =>
                    setSelectionValue(value.currentKey)
                  }
                >
                  {(option) => (
                    <SelectItem key={option.key} aria-label={option.label}>
                      {option.label}
                    </SelectItem>
                  )}
                </Select>
              )}
              {selected === 'delete' && (
                <Alert
                  color="warning"
                  icon={
                    <div className="fill-none ">
                      <Trash />
                    </div>
                  }
                  title="Eliminar clientes potenciales"
                  description={
                    <p className=" opacity-90">
                      Si eliminas los clientes con tratos activos se elminaran,
                      puedes restaurarlos en un plazo de 30 dias en la papelera
                      antes de que se elimine permanentemente.
                    </p>
                  }
                ></Alert>
              )}
            </>
          )}
          {!showAction ||
            (isPending && (
              <div className="flex flex-col mt-5 items-center">
                <Spinner />
                <p className="text-sm mt-1">
                  Estamos verificando si existen clientes en esta etapa...
                </p>
              </div>
            ))}
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="danger"
            variant="ghost"
            autoFocus
            onPress={() =>
              onDelete({
                type: showAction ? selected : undefined,
                moveStageId: selectionValue,
              })
            }
            isDisabled={disableSubmit}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
