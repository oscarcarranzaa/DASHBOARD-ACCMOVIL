import { deleteOneLead } from '@/api/crm'
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
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AlarmClock, CalendarClock } from 'lucide-react'

type TProps = {
  leadId: string
  title: string
  onOpenChange: () => void
  isOpen: boolean
  onClose: () => void
}
export default function AlertDeleteLead({
  leadId,
  title,
  onOpenChange,
  isOpen,
  onClose,
}: TProps) {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: deleteOneLead,
  })

  const handleDelete = () => {
    closeAll()
    const promise = mutateAsync(leadId)
      .then(() => {
        closeAll()
        addToast({
          color: 'success',
          variant: 'bordered',
          title: `Cliente potencial ${title} eliminado`,
          description: 'Se eliminó correctamente.',
        })
        onClose()
      })
      .catch((err) => {
        closeAll()
        addToast({
          color: 'danger',
          variant: 'bordered',
          title: `Error al eliminar cliente potencial ${title}`,
          description:
            err?.message ?? 'No se pudo eliminar el cliente potencial.',
        })
      })
      .finally(() => {
        queryClient.invalidateQueries({ queryKey: ['oneLead', leadId] })
      })

    addToast({
      title: `Eliminando cliente potencial ${title}`,
      description: 'Por favor espera...',
      color: 'default',
      variant: 'bordered',
      promise,
    })
  }

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="top"
      size="lg"
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
          <Button color="danger" variant="ghost" onPress={handleDelete}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
