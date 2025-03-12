'use client'
import SelectUser from '@/components/users/selectUser'
import {
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  DatePicker,
  DateValue,
  NumberInput,
} from '@heroui/react'
import { Plus } from 'lucide-react'
import SelectSourceLead from './selectSource'
import ContactInput from '../../contacts/contactInput'
import { useEffect, useState } from 'react'
import { contactSchema } from '@/types/customer'
import { newLeadSchema, ZNewLead } from '@/types/crm/leads'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { useAuthStore } from '@/store/auth'

export default function NewLead() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const thisUser = useAuthStore((state) => state.user)?.id

  const initialValues: newLeadSchema = {
    contactId: undefined,
    title: '',
    value: 0,
    name: '',
    expectedCloseDate: undefined,
    userId: thisUser,
    source: 'MANUALLY',
    email: '',
    phone: '',
    isNewContact: true,
  }
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { isDirty, errors },
  } = useForm<newLeadSchema>({
    resolver: zodResolver(ZNewLead),
    defaultValues: initialValues,
  })

  const handleSetContact = (contact: contactSchema) => {
    reset({
      ...getValues(),
      name: contact.name,
      contactId: contact.id,
      isNewContact: false,
      email: contact.email ?? undefined,
      phone: contact.phone ?? undefined,
    })
  }
  const handleSetNewContact = (name: string) => {
    reset({
      ...getValues(),
      contactId: undefined,
      name,
      phone: undefined,
      email: undefined,
      isNewContact: true,
    })
  }
  const handleClearContact = () => {
    reset({
      ...getValues(),
      contactId: undefined,
      name: '',
      phone: undefined,
      email: undefined,
      isNewContact: true,
    })
  }
  const submitLead = (lead: newLeadSchema) => {
    console.log(lead)
  }
  useEffect(() => {
    setValue('userId', thisUser)
  }, [thisUser])
  console.log('render', errors)
  return (
    <>
      <div>
        <Button onPress={onOpen} color="primary">
          <Plus /> Prospecto
        </Button>
        <Modal
          backdrop="opaque"
          isDismissable={false}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top"
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Añadir prospecto</ModalHeader>
                <form onSubmit={handleSubmit(submitLead)}>
                  <div className=" grid grid-cols-2">
                    <div className="px-3 flex flex-col gap-4">
                      <ContactInput
                        errors={errors.name?.message}
                        onContactChange={handleSetContact}
                        onNewContactChange={handleSetNewContact}
                        onClear={handleClearContact}
                      />
                      <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Descripción"
                            labelPlacement="outside"
                            variant="bordered"
                            label="Agrega una descripción"
                            errorMessage={errors.title?.message}
                            isInvalid={!!errors.title}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="value"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <NumberInput
                            labelPlacement="outside"
                            onValueChange={onChange}
                            variant="bordered"
                            placeholder="0.00"
                            value={value}
                            aria-label="Valor"
                            minValue={0}
                            errorMessage={errors.value?.message}
                            isInvalid={!!errors.value}
                            label="Valor"
                            aria-labelledby="Valor"
                            startContent={
                              <span className="text-default-400 text-small">
                                L.{' '}
                              </span>
                            }
                            endContent={
                              <span className="text-default-400 text-small">
                                HNL
                              </span>
                            }
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="expectedCloseDate"
                        render={({ field: { onChange, value } }) => {
                          const date = value
                            ? (parseDate(value) as unknown as DateValue)
                            : null
                          return (
                            <DatePicker
                              aria-label="Fecha"
                              aria-labelledby="fecha"
                              label="Fecha prevista de cierre"
                              labelPlacement="outside"
                              variant="bordered"
                              value={date}
                              onChange={(val) => {
                                onChange(
                                  val
                                    ?.toDate(getLocalTimeZone())
                                    .toISOString()
                                    .split('T')[0]
                                )
                              }}
                            />
                          )
                        }}
                      />
                      <Controller
                        control={control}
                        name="userId"
                        render={({ field: { onChange, value } }) => (
                          <SelectUser
                            label="Seleccionar propietario"
                            placeholder="Buscar propietario"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="source"
                        render={({ field: { onChange } }) => (
                          <SelectSourceLead onChange={onChange} />
                        )}
                      />
                    </div>
                    <div className="px-3 flex flex-col gap-4">
                      <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="example@correo.com"
                            labelPlacement="outside"
                            variant="bordered"
                            errorMessage={errors.email?.message}
                            isInvalid={!!errors.email}
                            type="email"
                            label="Correo electronico"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="99990000"
                            labelPlacement="outside"
                            variant="bordered"
                            type="number"
                            errorMessage={errors.phone?.message}
                            isInvalid={!!errors.phone}
                            label="Teléfono"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <ModalFooter className="dark:bg-zinc-800 bg-zinc-100 p-2 mt-10">
                    <Button className=" min-w-32" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button className=" min-w-32" color="primary" type="submit">
                      Crear
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
