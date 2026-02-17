import { updateContactData } from '@/api/contact'
import { updateLeadField } from '@/api/crm'
import InputField from '@/components/UI/editableFields/input'
import NumberInputField from '@/components/UI/editableFields/inputNumber'
import { leadSchema, leadSummarySchema, ZLeadSummary } from '@/types/crm/leads'
import { addToast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DollarSign, Type } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function LeadSummaryValues({ lead }: { lead: leadSchema }) {
  const [keyActive, setKeyActive] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const defaultValues = {
    title: lead.title,
    value: lead.value ?? undefined,
    expectedCloseDate: lead.expectedCloseDate ?? undefined,
  }
  const {
    control,
    trigger,
    resetField,
    reset,
    clearErrors,
    formState: { errors, dirtyFields },
    getValues,
  } = useForm<leadSummarySchema>({
    resolver: zodResolver(ZLeadSummary),
    defaultValues,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateLeadField,
    onSuccess: (updatedContact) => {
      setKeyActive(null)
      Object.entries(updatedContact).forEach(([key, value]) => {
        resetField(key as keyof leadSummarySchema, {
          defaultValue: typeof value === 'string' ? value : undefined,
        })
      })
      queryClient.invalidateQueries({ queryKey: ['oneLead', lead.id] })
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

  const handleAutoSubmit = async (fieldName: keyof leadSummarySchema) => {
    if (!dirtyFields[fieldName]) {
      clearErrors(fieldName)
      return
    }
    const isValid = await trigger(fieldName)
    if (!isValid) {
      addToast({
        color: 'warning',
        variant: 'bordered',
        timeout: 5000,
        title: 'Advertencia de error',
        description: `Error en los datos [Entrada: ${fieldName}] `,
      })
      return
    }
    const value = getValues(fieldName)
    const editField = { [fieldName]: value }
    mutate({ id: lead.id, lead: editField })
    setKeyActive(fieldName)
  }
  return (
    <>
      <div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <InputField
              isPending={isPending && keyActive === field.name}
              startContent={<Type size={18} />}
              placeholder="Descripción del Lead"
              value={field.value}
              type="text"
              label="Agregar descripcion"
              isRequired
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.title?.message}
            />
          )}
        />
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <NumberInputField
              isPending={isPending && keyActive === field.name}
              startContent={<DollarSign size={18} />}
              placeholder="599.00"
              value={field.value ?? undefined}
              type="number"
              label="Valor"
              onBlur={() => handleAutoSubmit(field.name)}
              onValueChange={(v) => field.onChange(v)}
              error={errors.value?.message}
            />
          )}
        />
      </div>
    </>
  )
}
