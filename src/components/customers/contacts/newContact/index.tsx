'use client'
import { createCustomer } from '@/api/customer'
import EyeSVG from '@/components/icons/eye'
import EyeInvisibleSVG from '@/components/icons/eyeInvisible'
import Spinner from '@/components/icons/spinner'
import {
  createContactSchema,
  createCustomerSchema,
  ZCreateContact,
  ZCreateCustomer,
} from '@/types/customer'
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
import { contactStatusOption } from './contactStatusOptions'
import WarningInfo from '@/components/icons/warningInfo'
import { createContact } from '@/api/contact'

const defaultStatus = 'SUBSCRIBED' as const
export default function CreateContact() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const queryClient = useQueryClient()
  const defaultValues = {
    firstName: '',
    status: defaultStatus,
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createContactSchema>({
    resolver: zodResolver(ZCreateContact),
    defaultValues,
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      reset()
      onClose()
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })

  const handleSubmitNewContact = (form: createContactSchema) => {
    mutate(form)
  }
  return (
    <>
      <div>
        <Button color="primary" onPress={onOpen}>
          Crear contacto
        </Button>
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="bottom-center"
          size="xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Crear nuevo contacto</ModalHeader>
                <form onSubmit={handleSubmit(handleSubmitNewContact)}>
                  <div className="p-5  grid gap-y-4">
                    <div className="flex gap-2">
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
                            placeholder="Ejem: (Juan Jose)"
                            label="Nombre"
                            required
                            variant="bordered"
                            labelPlacement="outside"
                            isRequired
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
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="Ejem: (Martínez García)"
                            label="Apellidos"
                          />
                        )}
                      />
                    </div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          errorMessage={errors.email?.message}
                          isInvalid={!!errors.email}
                          variant="bordered"
                          labelPlacement="outside"
                          placeholder="example@example.com"
                          label="Correo"
                        />
                      )}
                    />

                    <div className=" flex gap-2">
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            errorMessage={errors.phone?.message}
                            isInvalid={!!errors.phone}
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="98158066"
                            label="Numero de telefono"
                          />
                        )}
                      />
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            label="Estado de Marketing"
                            className="max-w-xs"
                            variant="bordered"
                            labelPlacement="outside"
                            defaultSelectedKeys={['SUBSCRIBED']}
                          >
                            {contactStatusOption.map((op) => (
                              <SelectItem key={op.key}>{op.label}</SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            variant="bordered"
                            labelPlacement="outside"
                            errorMessage={errors.address?.message}
                            isInvalid={!!errors.address}
                            placeholder="TGU, Anillo periférico, AV. 72"
                            label="Dirección"
                          />
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-1 stroke-blue-500 ml-2">
                      <WarningInfo size={18} />
                      <p className="text-xs  text-blue-500">
                        El estado de Marketing solo funcionará si se agrega la
                        dirección de correo electrónico.
                      </p>
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
