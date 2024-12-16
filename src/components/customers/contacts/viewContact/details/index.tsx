import { updateContactData } from '@/api/contact'
import EmailSVG from '@/components/icons/email'
import PhoneSVG from '@/components/icons/phone'
import UbicationSVG from '@/components/icons/ubication'
import EditableFields from '@/components/UI/editableFields'
import {
  contactDetailsSchema,
  contactSchema,
  ZContactDetails,
} from '@/types/customer'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ContactDetails({
  contact,
}: {
  contact: contactSchema
}) {
  const queryClient = useQueryClient()

  const defaultValues = {
    firstName: contact.firstName ?? undefined,
    lastName: contact.lastName ?? undefined,
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
      toast.success('Contacto actualizado')
    },
    onError: (err) => {
      toast.error(err.message || 'Ocurrió un error desconocido')
    },
  })

  const handleAutoSubmit = async (fieldName: keyof contactDetailsSchema) => {
    if (!dirtyFields[fieldName]) return
    const isValid = await trigger(fieldName)
    if (!isValid) {
      toast.warning(`Error en los datos [field: ${fieldName}] `)
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
          name="firstName"
          control={control}
          render={({ field }) => (
            <EditableFields
              startContent={<p className="text-sm ">Nombres:</p>}
              placeholder="Ej: Juan Jose"
              type="text"
              value={field.value}
              label="Nuevo nombre"
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <EditableFields
              value={field.value}
              startContent={<p className="text-sm ">Apellidos:</p>}
              placeholder="Ej: Martinez"
              type="text"
              label="Agregar apellido"
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.lastName?.message}
            />
          )}
        />
      </div>
    </>
  )
}
