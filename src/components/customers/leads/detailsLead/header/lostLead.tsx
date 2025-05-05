import { changeLeadStatus } from '@/api/crm'
import Spinner from '@/components/icons/spinner'
import { getOneLeadShema } from '@/types/crm/leads'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Alert,
  addToast,
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type TProps = {
  leadId: string
}
export default function LostLeadAction({ leadId }: TProps) {
  const [value, setValue] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const queryClient = useQueryClient()
  const leadQueryKey = ['oneLead', leadId]

  const { mutate, isPending } = useMutation({
    mutationFn: changeLeadStatus,
    onSuccess: async (success) => {
      await queryClient.cancelQueries({ queryKey: ['oneLead'] })
      queryClient.setQueryData(leadQueryKey, (oldLead: getOneLeadShema) => {
        if (!oldLead) return oldLead
        return success
      })
      setValue('')
    },
    onError: (err) => {
      addToast({
        title: 'Ocurrió un error',
        variant: 'bordered',
        timeout: 5000,
        color: 'danger',
        description: err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: leadQueryKey,
      })
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
    },
  })

  const handleLost = () => {
    if (value.length < 3) return
    mutate({ leadId, status: 'LOST', lostComment: value })
  }
  return (
    <>
      <Button
        className="rounded-md w-20"
        color="danger"
        variant="bordered"
        onPress={onOpen}
        isDisabled={isPending}
      >
        {isPending ? <Spinner fill="#f00" size={18} /> : 'Perdido'}
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Marcar como perdido
              </ModalHeader>
              <ModalBody>
                <Textarea
                  isClearable
                  value={value}
                  onValueChange={setValue}
                  isRequired
                  labelPlacement="outside"
                  label="Razón de la pérdida"
                  placeholder="Escriba la razón por el cual se perdió este cliente"
                  variant="bordered"
                  onClear={() => console.log('textarea cleared')}
                />

                <p className="text-xs opacity-70    ">
                  Esto le ayudará a entender las razones de porque se están
                  perdiendo las oportunidades de completar una venta.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="flat"
                  radius="sm"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  variant="ghost"
                  className=" w-48"
                  isDisabled={value.length < 3 || isPending}
                  radius="sm"
                  onPress={() => {
                    onClose()
                    handleLost()
                  }}
                >
                  {isPending ? (
                    <Spinner fill="#f00" size={18} />
                  ) : (
                    'Marcar como perdido'
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
