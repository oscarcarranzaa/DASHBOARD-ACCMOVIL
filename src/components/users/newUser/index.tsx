import { createUser } from '@/api/users'
import EyeSVG from '@/components/icons/eye'
import EyeInvisibleSVG from '@/components/icons/eyeInvisible'
import Spinner from '@/components/icons/spinner'
import { CreateUserSchema, ZCreateUser } from '@/types/users'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  Input,
  ModalHeader,
  ModalFooter,
} from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

export default function NewUserForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [isVisible, setIsVisible] = useState(false)
  const queryClient = useQueryClient()
  const defaultValues = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(ZCreateUser),
    defaultValues,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      reset()
      onClose()
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  const handleSubmitNewUSer = (form: CreateUserSchema) => {
    mutate(form)
  }
  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <>
      <div>
        <Button color="primary" onPress={onOpen}>
          Nuevo usuario
        </Button>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="bottom-center"
          size="xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Crear nuevo usuario</ModalHeader>
                <form onSubmit={handleSubmit(handleSubmitNewUSer)}>
                  <div className="p-5  gap-y-3">
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          errorMessage={errors.email?.message}
                          isInvalid={!!errors.email}
                          type="email"
                          placeholder="example@example.com"
                          label="Correo"
                          required
                          isRequired
                        />
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="mt-5"
                          type={isVisible ? 'text' : 'password'}
                          placeholder="Contraseña"
                          label="Contraseña"
                          errorMessage={errors.password?.message}
                          isInvalid={!!errors.password}
                          endContent={
                            <button
                              className="focus:outline-none dark:fill-zinc-400"
                              type="button"
                              onClick={toggleVisibility}
                              aria-label="toggle password visibility"
                            >
                              {isVisible ? (
                                <EyeInvisibleSVG size={24} />
                              ) : (
                                <EyeSVG size={24} />
                              )}
                            </button>
                          }
                          required
                          isRequired
                        />
                      )}
                    />

                    <div className="mt-5 flex gap-2">
                      <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            errorMessage={errors.firstName?.message}
                            isInvalid={!!errors.firstName}
                            placeholder="Ejem: (Juan Fernando)"
                            label="Nombres"
                            required
                            isRequired
                          />
                        )}
                      />
                      <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            errorMessage={errors.lastName?.message}
                            isInvalid={!!errors.lastName}
                            type="text"
                            placeholder="Ejem: (Martínez García)"
                            label="Apellidos"
                            required
                            isRequired
                          />
                        )}
                      />
                    </div>
                  </div>
                  <ModalFooter>
                    <Button className=" min-w-32" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      className=" min-w-32"
                      color="primary"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <div className=" animate-spin">
                          <Spinner size={24} fill="#fff" />
                        </div>
                      ) : (
                        'Crear'
                      )}
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
        <form></form>
      </div>
    </>
  )
}
