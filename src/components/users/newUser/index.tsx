import { createUser, getAllRoles } from '@/api/users'
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
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
    roleId: null,
    email: '',
    username: '',
    job: '',
  }
  const { data, isPending: pendingRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
    refetchOnWindowFocus: false,
  })
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(ZCreateUser),
    defaultValues,
  })
  const { mutate, isPending, error } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      reset()
      onClose()
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  const handleSubmitNewUSer = (form: CreateUserSchema) => {
    mutate(form)
  }
  const toggleVisibility = () => setIsVisible(!isVisible)
  const optionsRoles = data ?? []

  const setRole = (key: string | null) => {
    setValue('roleId', key)
  }
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
                    <div className="mt-5 flex gap-2">
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

                      <Autocomplete
                        items={data}
                        isLoading={pendingRoles}
                        className="mt-5"
                        label="Rol"
                        placeholder="Seleccione un Rol"
                        onSelectionChange={(key) =>
                          setRole(key ? key.toString() : null)
                        }
                      >
                        {optionsRoles.map((role) => (
                          <AutocompleteItem key={role.id} value={role.id}>
                            {role.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>

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
                    <div className="mt-5 flex gap-2">
                      <Controller
                        name="username"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            errorMessage={errors.username?.message}
                            isInvalid={!!errors.username}
                            placeholder="Ejem: (juanfernandez13)"
                            label="Nombre de usuario"
                            required
                            isRequired
                          />
                        )}
                      />
                      <Controller
                        name="job"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            errorMessage={errors.job?.message}
                            isInvalid={!!errors.job}
                            type="text"
                            placeholder="Ejem: (Marketing)"
                            label="Puesto de trabajo"
                            required
                            isRequired
                          />
                        )}
                      />
                    </div>
                    {error && (
                      <p className="text-xs mt-2 ml-2 text-red-500 font-semibold">
                        {error.message}
                      </p>
                    )}
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
      </div>
    </>
  )
}
