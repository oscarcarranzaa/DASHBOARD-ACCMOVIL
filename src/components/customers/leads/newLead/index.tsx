/* eslint-disable react-hooks/exhaustive-deps */
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
  addToast,
  ButtonProps,
} from '@heroui/react'
import { Plus } from 'lucide-react'
import SelectSourceLead from './selectSource'
import ContactInput from '../../contacts/contactInput'
import { useEffect, useState } from 'react'
import { contactSchema } from '@/types/customer'
import { newLeadSchema, newLeadSchemaInput, ZNewLead } from '@/types/crm/leads'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { useAuthStore } from '@/store/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLead } from '@/api/crm'
import Spinner from '@/components/icons/spinner'
import SelectPipeline from '../../crm/pipeline/selectPipeline'

type TProps = {
  button?: ButtonProps
  isDisabled?: boolean
}
export default function NewLead({ button, isDisabled }: TProps) {
  const [dateValue, setDateValue] = useState<DateValue | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const thisUser = useAuthStore((state) => state.user)?.id
  const queryClient = useQueryClient()

  const initialValues: newLeadSchema = {
    contactId: undefined,
    pipelineId: '',
    title: '',
    value: 0,
    name: '',
    expectedCloseDate: undefined,
    assignedToId: thisUser,
    source: undefined,
    email: undefined,
    phone: undefined,
    isNewContact: true,
  }
  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<newLeadSchemaInput>({
    resolver: zodResolver(ZNewLead),
    defaultValues: initialValues,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: addLead,
    onSuccess: () => {
      reset(initialValues)
      onOpenChange()
      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: 'Nuevo cliente potencial agregado',
      })
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      queryClient.invalidateQueries({ queryKey: ['leadsFunnel'] })
    },
    onError: (err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrió un error',
        description: err.message,
      })
    },
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
  const submitLead = (lead: newLeadSchemaInput) => {
    mutate(lead)
  }

  useEffect(() => {
    setValue('assignedToId', thisUser)
  }, [thisUser])
  useEffect(() => {
    if (dateValue) {
      const jsDate = dateValue.toDate(getLocalTimeZone())
      const dateOnly = jsDate.toISOString()
      setValue('expectedCloseDate', dateOnly, { shouldDirty: true })
    }
  }, [dateValue])
  return (
    <>
      <div>
        <Button
          isDisabled={isDisabled}
          onPress={onOpen}
          color="primary"
          {...button}
        >
          <Plus /> Cliente
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
                <ModalHeader>Añadir cliente potencial</ModalHeader>
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
                        rules={{ required: 'La descripción es requerida' }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            isRequired
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
                        render={({ field: { onChange, value, ref } }) => (
                          <NumberInput
                            labelPlacement="outside"
                            onValueChange={onChange}
                            variant="bordered"
                            placeholder="0.00"
                            value={value ?? undefined}
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

                      <DatePicker
                        aria-label="Fecha"
                        aria-labelledby="fecha"
                        label="Fecha prevista de cierre"
                        labelPlacement="outside"
                        variant="bordered"
                        value={dateValue}
                        onChange={setDateValue}
                      />

                      <Controller
                        control={control}
                        name="pipelineId"
                        render={({ field: { onChange, value } }) => (
                          <SelectPipeline
                            label="Seleccionar embudo"
                            placeholder="Embudo"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="assignedToId"
                        render={({ field: { onChange, value } }) => (
                          <SelectUser
                            label="Asingnar propietario"
                            placeholder="Buscar"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="source"
                        render={({ field: { onChange, value } }) => (
                          <SelectSourceLead value={value} onChange={onChange} />
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
                            isDisabled={!getValues('isNewContact')}
                            readOnly={!getValues('isNewContact')}
                            placeholder="example@correo.com"
                            labelPlacement="outside"
                            variant="bordered"
                            errorMessage={errors.email?.message}
                            isInvalid={!!errors.email}
                            type="email"
                            label="Correo electronico"
                            className={
                              !getValues('isNewContact')
                                ? 'cursor-not-allowed'
                                : ''
                            }
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <Input
                            {...field}
                            readOnly={!getValues('isNewContact')}
                            isDisabled={!getValues('isNewContact')}
                            placeholder="99990000"
                            labelPlacement="outside"
                            variant="bordered"
                            type="number"
                            errorMessage={errors.phone?.message}
                            isInvalid={!!errors.phone}
                            label="Teléfono"
                            className={
                              !getValues('isNewContact')
                                ? 'cursor-not-allowed'
                                : ''
                            }
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
                      {isPending ? <Spinner size={20} fill="#fff" /> : 'Crear'}
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
