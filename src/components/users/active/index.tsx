import { activeUser } from '@/api/users'
import { UserOwnerSchema } from '@/types/users'
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  addToast,
  useDisclosure,
} from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserRoundCheck } from 'lucide-react'

type TProps = {
  user: UserOwnerSchema
  button: React.ReactNode
  buttonProps?: ButtonProps
}

export default function ActiveUser({ user, button, buttonProps }: TProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: activeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onClose()
      addToast({
        title: 'Usuario activado',
        description: 'El usuario ha sido activado correctamente.',
        variant: 'bordered',
        color: 'success',
      })
    },
    onError: (error) => {
      addToast({
        title: 'Error al activar usuario',
        description: error.message,
        variant: 'bordered',
        color: 'danger',
      })
    },
  })

  return (
    <div>
      <Button onPress={onOpen} {...buttonProps}>
        {button}
      </Button>
      <Modal
        size="2xl"
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: 'z-100000',
          header: 'border-b border-[#292f4666]',
          wrapper: 'z-100000',
        }}
      >
        <ModalContent>
          <ModalHeader>
            <p className="font-semibold text-lg">
              ¿Desea activar al usuario{' '}
              <span className="font-bold">
                &quot;
                {user.firstName + ' ' + user.lastName}&quot;
              </span>
              ?
            </p>
          </ModalHeader>
          <ModalBody>
            <p>Reactiva a este usuario para que pueda iniciar sesión.</p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onOpenChange} variant="flat">
              Cancelar
            </Button>
            <Button
              color="success"
              variant="flat"
              isDisabled={isPending}
              onPress={() => mutate({ userId: user.id })}
              startContent={
                isPending ? (
                  <Spinner color="success" size="sm" variant="simple" />
                ) : (
                  <UserRoundCheck size={20} />
                )
              }
            >
              Reactivar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
