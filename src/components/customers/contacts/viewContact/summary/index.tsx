import { updateContactData } from '@/api/contact'
import EmailSVG from '@/components/icons/email'
import PhoneSVG from '@/components/icons/phone'
import UbicationSVG from '@/components/icons/ubication'
import InputField from '@/components/UI/editableFields/input'
import {
  contactSchema,
  contactSummarySchema,
  contactSummarySchemaInput,
  ZContactSummary,
} from '@/types/customer'
import { addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function ContactSummary({
  contact,
}: {
  contact: contactSchema
}) {
  const [keyActive, setKeyActive] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const defaultValues = {
    email: contact.email ?? undefined,
    phone: contact.phone ?? undefined,
    address: contact.address ?? undefined,
  }
  const {
    control,
    trigger,
    resetField,
    reset,
    clearErrors,
    formState: { errors, dirtyFields },
    getValues,
  } = useForm<contactSummarySchemaInput>({
    resolver: zodResolver(ZContactSummary),
    defaultValues,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateContactData,
    onSuccess: (updatedContact) => {
      Object.entries(updatedContact).forEach(([key, value]) => {
        resetField(key as keyof contactSummarySchema, {
          defaultValue: typeof value === 'string' ? value : undefined,
        })
      })
      queryClient.invalidateQueries({ queryKey: ['contact', contact.id] })
      setKeyActive(null)
    },
    onError: (err) => {
      setKeyActive(null)
      reset(defaultValues)
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: err.message,
      })
    },
  })

  const handleAutoSubmit = async (fieldName: keyof contactSummarySchema) => {
    if (!dirtyFields[fieldName]) {
      clearErrors(fieldName)
      return
    }
    const isValid = await trigger(fieldName)
    if (!isValid) {
      const getError = errors[fieldName]?.message
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Error en el formulario',
        description: getError,
      })
      resetField(fieldName)
      return
    }
    const value = getValues(fieldName)
    const editField = { [fieldName]: value }
    setKeyActive(fieldName)
    mutate({ id: contact.id, contact: editField })
  }
  return (
    <>
      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              isPending={isPending && keyActive === field.name}
              startContent={<EmailSVG size={24} />}
              placeholder="example@correo.com"
              value={field.value}
              type="email"
              label="Agregar correo"
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputField
              isPending={isPending && keyActive === field.name}
              startContent={<PhoneSVG size={24} />}
              placeholder="98158066"
              value={field.value}
              type="text"
              label="Agregar teléfono"
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.phone?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <InputField
              isPending={isPending && keyActive === field.name}
              startContent={<UbicationSVG size={24} />}
              placeholder="EJ: Av. 70 NW"
              type="text"
              value={field.value}
              label="Agregar dirección"
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.address?.message}
            />
          )}
        />
      </div>
    </>
  )
}
