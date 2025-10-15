'use client'

import { deleteOneLead } from '@/api/crm'
import Spinner from '@/components/icons/spinner'
import { allLeadShema } from '@/types/crm/leads'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast,
  ButtonProps,
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type TProps = {
  leadId: string
  title: string
  buttonProps?: ButtonProps
}
export default function DeleteLeadModal({
  leadId,
  title,
  buttonProps,
}: TProps) {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('leadPage')) || 1
  const funnelId = searchParams.get('id')

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteOneLead,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['leads'] })
      const previousLeads = queryClient.getQueryData([
        'leads',
        currentPage.toString(),
        funnelId,
      ])
      queryClient.setQueryData(
        ['leads', currentPage.toString(), funnelId],
        (oldLead: allLeadShema) => {
          if (!oldLead) return oldLead
          return {
            ...oldLead,
            data: oldLead.data.filter((lead) => lead.id !== newData),
          }
        }
      )
      return { previousLeads }
    },
    onError: (_err, _newData, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(
          ['leads', currentPage.toString(), funnelId],
          context.previousLeads
        )
      }
      addToast({
        variant: 'bordered',
        color: 'danger',
        title: 'Ocurrió un error',
        description: _err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['leads', currentPage.toString(), funnelId],
      })
      onClose()
    },
  })
  const handleDeleteLead = () => {
    mutate(leadId)
  }
  return (
    <div className="w-full">
      <Button {...buttonProps} onPress={onOpen}>
        Eliminar
      </Button>
      <Modal
        classNames={{
          backdrop: 'z-100000',
          wrapper: 'z-100000',
        }}
        isDismissable
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>
                  ¿Estás seguro de querer eliminar este cliente potencial{' '}
                  <span className=" underline">
                    &quot;
                    {title}&quot;
                  </span>
                  ?
                </p>
              </ModalHeader>
              <ModalBody>
                <p className="text-sm">
                  también se elminarán las notas, archivos y documentos
                  vinculados.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  isDisabled={isPending}
                  color="danger"
                  onPress={handleDeleteLead}
                >
                  {!isPending ? 'Eliminar' : <Spinner size={18} fill="#fff" />}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
