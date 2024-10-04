'use client'
import { createCustomer } from '@/api/customer'
import EyeSVG from '@/components/icons/eye'
import EyeInvisibleSVG from '@/components/icons/eyeInvisible'
import Spinner from '@/components/icons/spinner'
import { createCustomerSchema, ZCreateCustomer } from '@/types/customer'
import { genderSelect } from '@/utils/gender'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  Input,
  ModalHeader,
  ModalFooter,
  SelectItem,
  Select,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

export default function NewCustomerForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [isVisible, setIsVisible] = useState(false)
  const queryClient = useQueryClient()
  const defaultValues = {
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    email: '',
    gender: '',
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createCustomerSchema>({
    resolver: zodResolver(ZCreateCustomer),
    defaultValues,
  })
  const { mutate, isPending, error } = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      reset()
      onClose()
      queryClient.invalidateQueries({ queryKey: ['customer'] })
    },
  })

  const handleSubmitNewCustomer = (form: createCustomerSchema) => {
    mutate(form)
  }
  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <>
      <div>
        <Button color="primary" onPress={onOpen}>
          Agregar cliente
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
                <ModalHeader>Crear nuevo cliente</ModalHeader>
                <form onSubmit={handleSubmit(handleSubmitNewCustomer)}>
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
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            errorMessage={errors.firstName?.message}
                            isInvalid={!!errors.firstName}
                            placeholder="Ejem: (Juan Fernando)"
                            label="Nombres"
                          />
                        )}
                      />
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            errorMessage={errors.lastName?.message}
                            isInvalid={!!errors.lastName}
                            type="text"
                            placeholder="Ejem: (Martínez García)"
                            label="Apellidos"
                          />
                        )}
                      />
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            errorMessage={errors.phone?.message}
                            isInvalid={!!errors.phone}
                            placeholder="9815-8066"
                            label="Numero de telefono"
                          />
                        )}
                      />
                      <Controller
                        name="gender"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            label="Genero"
                            className="max-w-xs"
                          >
                            {genderSelect.map((gender) => (
                              <SelectItem key={gender.key}>
                                {gender.label}
                              </SelectItem>
                            ))}
                          </Select>
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
