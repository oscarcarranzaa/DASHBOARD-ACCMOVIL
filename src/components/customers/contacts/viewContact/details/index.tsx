import { updateContactData } from '@/api/contact'
import DatePickerField from '@/components/UI/editableFields/DatePicker'
import InputField from '@/components/UI/editableFields/input'
import {
  contactDetailsSchema,
  contactSchema,
  ZContactDetails,
} from '@/types/customer'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToast, DateValue } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function ContactDetails({
  contact,
}: {
  contact: contactSchema
}) {
  const [expires, setExpires] = useState<DateValue | null>()
  const queryClient = useQueryClient()

  const defaultValues = {
    name: contact.name ?? undefined,

    dateOfBirth: contact.dateOfBirth ?? undefined,
  }
  const {
    control,
    trigger,
    formState: { errors, dirtyFields },
    getValues,
    resetField,
  } = useForm<contactDetailsSchema>({
    resolver: zodResolver(ZContactDetails),
    defaultValues,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateContactData,
    onSuccess: (updatedContact) => {
      Object.entries(updatedContact).forEach(([key, value]) => {
        resetField(key as keyof contactDetailsSchema, {
          defaultValue: typeof value === 'string' ? value : undefined,
        })
      })
      queryClient.invalidateQueries({ queryKey: ['contact', contact.id] })
      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: 'Contacto actualizado',
      })
    },
    onError: (err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: err.message,
      })
    },
  })

  const handleAutoSubmit = async (fieldName: keyof contactDetailsSchema) => {
    if (!dirtyFields[fieldName]) return
    const isValid = await trigger(fieldName)
    if (!isValid) {
      addToast({
        color: 'warning',
        variant: 'bordered',
        timeout: 5000,
        title: 'Advertencia de error',
        description: `Error en los datos [campo: ${fieldName}] `,
      })

      return
    }
    const value = getValues(fieldName)
    const editField = { [fieldName]: value }
    mutate({ id: contact.id, contact: editField })
  }
  return (
    <>
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              startContent={<p className="text-sm ">Nombre:</p>}
              placeholder="Ej: Juan Jose"
              type="text"
              value={field.value}
              label="Nuevo nombre"
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <DatePickerField
              label="Nacimiento"
              startContent={<p className="text-sm ">Nacimiento:</p>}
              onValueChange={(e) => field.onChange(e)}
              value={field.value}
              onBlur={() => handleAutoSubmit(field.name)}
            />
          )}
        />
      </div>
    </>
  )
}
