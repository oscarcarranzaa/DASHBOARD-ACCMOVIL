import { UserOwnerSchema } from '@/types/users'
import {
  Alert,
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Spinner,
  addToast,
  useDisclosure,
} from '@heroui/react'
import { ChevronLeft, ChevronRight, CircleOff } from 'lucide-react'
import SelectUser from '../selectUser'
import FunnnelSVG from '@/components/icons/funnel'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { countUserActivities, disabledUser } from '@/api/users'
import { useState } from 'react'
type TProps = {
  user: UserOwnerSchema
  button: React.ReactNode
  buttonProps?: ButtonProps
}

export default function DisableUser({ user, button, buttonProps }: TProps) {
  const [assignUser, setAssignUser] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { data } = useQuery({
    queryKey: ['countUserActivities', user.id],
    queryFn: () => countUserActivities(user.id),
    refetchOnWindowFocus: true,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: disabledUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onClose()
      addToast({
        title: 'Usuario desactivado',
        description: 'El usuario ha sido desactivado correctamente.',
        variant: 'bordered',
        color: 'success',
      })
    },
    onError: (error) => {
      addToast({
        title: 'Error al desactivar usuario',
        description: error?.message,
        variant: 'bordered',
        color: 'danger',
      })
    },
  })

  const notActivities = data?.countLeads === 0

  const handleDisable = () => {
    mutate({ userId: user.id, assingToId: assignUser || undefined })
  }
  return (
    <div className="w-full">
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
          header: 'border-b border-[#292f46]',
          wrapper: 'z-100000',
        }}
      >
        <ModalContent>
          <ModalHeader>
            <p className="font-semibold text-lg">
              ¿Desea desactivar al usuario{' '}
              <span className="font-bold">
                &quot;
                {user.firstName + ' ' + user.lastName}&quot;
              </span>
              ?
            </p>
          </ModalHeader>
          <ModalBody>
            <p className="mt-5">
              Verifique las actividades abiertas de este usuario.
            </p>
            <div className="flex ">
              <div className="w-full border border-zinc-500/50 p-4 ">
                <p className="text-sm">Actividades abiertas</p>
                <ul className="list-none mt-4 flex flex-col gap-2 text-primary">
                  <li className="flex gap-2 items-center ">
                    <FunnnelSVG size={20} />
                    {data && (
                      <>
                        <p>{data?.countLeads}</p>
                        <p>Clientes potenciales</p>
                      </>
                    )}
                    {!data && (
                      <div className="w-full h-4">
                        <Skeleton className="w-full h-4" />
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              {!notActivities && (
                <>
                  <div className="flex items-center">
                    <ChevronRight size={18} />
                  </div>
                  <div className="w-full border border-zinc-500/50 p-4 ">
                    <p className="text-sm">Transferir actividades (opcional)</p>
                    <div className="mt-4">
                      <SelectUser
                        onChange={(value) => setAssignUser(value)}
                        value={assignUser}
                        disabledUserId={[user.id]}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <Alert
              color="primary"
              description="Se recomienda revisar cualquier configuración que pueda estar relacionada con este usuario."
              title="Atención"
              variant="faded"
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onOpenChange}>Cancelar</Button>
            <Button
              onPress={handleDisable}
              color="danger"
              variant="ghost"
              isDisabled={isPending}
              startContent={
                isPending ? (
                  <Spinner color="danger" size="sm" variant="simple" />
                ) : (
                  <CircleOff size={20} />
                )
              }
            >
              Desactivar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
