import { deleteOneLead, restoreOneLead } from '@/api/crm'
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
import dayjs from 'dayjs'
import { CalendarClock, Recycle } from 'lucide-react'

type TProps = {
  leadId: string
  title: string
  onOpenChange: () => void
  deletedAt?: string | null
  isOpen: boolean
  onClose: () => void
}
export default function AlertRestoreLead({
  leadId,
  title,
  onOpenChange,
  deletedAt,
  isOpen,
  onClose,
}: TProps) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: restoreOneLead,
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
    onError: (err) => {
      closeAll()
      onClose()
      addToast({
        color: 'danger',
        variant: 'bordered',
        title: `Error al restaurar cliente potencial ${title}`,
        description:
          err?.message ?? 'No se pudo restaurar el cliente potencial.',
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['oneLead', leadId] })
      queryClient.invalidateQueries({ queryKey: [leadId, 'history'] })
    },
  })
  const daysLeft = dayjs(deletedAt).add(30, 'day').diff(dayjs(), 'days')
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
        <ModalHeader>¿Restaurar este cliente potencial?</ModalHeader>
        <ModalBody>
          <p className="text-sm">
            ¿Estás seguro de querer restaurar este cliente potencial:{' '}
            <b className=" underline">{title}</b>?
          </p>
          {deletedAt && (
            <Alert
              variant="bordered"
              color="primary"
              icon={
                <div className="fill-none ">
                  <Recycle />
                </div>
              }
              title="Restaurar cliente potencial"
              description={
                <p className=" opacity-90">
                  Este cliente potencial se eliminará permanentemente{' '}
                  {daysLeft <= 0 ? 'hoy' : `en ${daysLeft} días`}, puedes
                  restaurarlo antes de que se elimine automáticamente.
                </p>
              }
            ></Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="bordered" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="ghost"
            onPress={() => mutate(leadId)}
            isDisabled={isPending}
            autoFocus
          >
            {isPending ? <Spinner size="sm" color="primary" /> : 'Restaurar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
