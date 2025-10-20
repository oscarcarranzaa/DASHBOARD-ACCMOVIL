import { deleteOneLead } from '@/api/crm'
import { allLeadShema } from '@/types/crm/leads'
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
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AlarmClock, CalendarClock } from 'lucide-react'

type TProps = {
  leadId: string
  title: string
  currentPage?: number
  funnelId?: string
  onOpenChange: () => void
  isOpen: boolean
  onClose: () => void
}
export default function AlertDeleteLead({
  leadId,
  title,
  currentPage,
  funnelId,
  onOpenChange,
  isOpen,
  onClose,
}: TProps) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteOneLead,
    onMutate: async (newData) => {
      if (currentPage) {
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
      }
    },
    onSuccess: () => {
      closeAll()
      onClose()
      addToast({
        color: 'success',
        variant: 'bordered',
        title: `Cliente potencial ${title} eliminado`,
        description: 'Se eliminó correctamente.',
      })
    },
    onError: (err, _newData, context) => {
      closeAll()
      onClose()
      if (context?.previousLeads && currentPage) {
        queryClient.setQueryData(
          ['leads', currentPage.toString(), funnelId],
          context.previousLeads
        )
      }
      addToast({
        color: 'danger',
        variant: 'bordered',
        title: `Error al eliminar cliente potencial ${title}`,
        description:
          err?.message ?? 'No se pudo eliminar el cliente potencial.',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
      queryClient.invalidateQueries({ queryKey: ['oneLead', leadId] })
      if (currentPage) {
        queryClient.invalidateQueries({
          queryKey: ['leads', currentPage.toString(), funnelId],
        })
      }
    },
  })

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="top"
      size="lg"
      classNames={{
        backdrop: 'z-100000',
        wrapper: 'z-100000',
      }}
    >
      <ModalContent>
        <ModalHeader>¿Eliminar este cliente potencial?</ModalHeader>
        <ModalBody>
          <p className="text-sm">
            ¿Estás seguro de querer eliminar este cliente potencial:{' '}
            <b className=" underline">{title}</b>?
          </p>
          <Alert
            variant="bordered"
            color="danger"
            icon={
              <div className="fill-none ">
                <CalendarClock />
              </div>
            }
            title="Eliminar cliente potencial"
            description={
              <p className=" opacity-90">
                Este cliente potencial se eliminará permanentemente dentro de 30
                días, puede volver a restaurarse desde los ajustes {'>'}{' '}
                papelera.
              </p>
            }
          ></Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="danger"
            variant="ghost"
            onPress={() => mutate(leadId)}
            isDisabled={isPending}
            autoFocus
          >
            {isPending ? <Spinner size="sm" color="danger" /> : 'Eliminar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
