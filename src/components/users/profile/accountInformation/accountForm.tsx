'use client'
import { editProfileInfoSchema, ZEditProfileInfo } from '@/types/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { Button, DatePicker, Input, DateValue } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { UserSchema } from '@/types/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserInfo } from '@/api/userData'
import { toast } from 'sonner'

type TProps = {
  user: UserSchema
}
export default function AccountInformationForm({ user }: TProps) {
  const [dateValue, setDateValue] = useState<DateValue | null>()
  const queryClient = useQueryClient()
  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    phone: user.phone ?? '',
    documentNumber: user.documentNumber ?? '',
    birthDate: user.birthDate ?? undefined,
  }
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<editProfileInfoSchema>({
    resolver: zodResolver(ZEditProfileInfo),
    defaultValues,
  })
  const { data, mutate, isPending } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (u) => {
      toast.success('Cuenta actualizada')
      queryClient.invalidateQueries({ queryKey: ['user'] })
      reset({
        firstName: u.firstName,
        lastName: u.lastName,
        username: u.username,
        phone: u.phone ?? '',
        documentNumber: u.documentNumber ?? '',
        birthDate: u.birthDate ?? undefined,
      })
    },
    onError: (e) => {
      toast.error(e.message || 'Error al actualizar datos')
    },
  })
  useEffect(() => {
    if (user.birthDate) {
      setDateValue(parseDate(user.birthDate.split('T')[0]))
    }
  }, [user])

  const submitUserInfo = (form: editProfileInfoSchema) => {
    mutate(form)
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submitUserInfo)}>
          <div className=" grid grid-cols-2 gap-5 mt-10">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Tus nombres"
                  label="Nombres"
                  labelPlacement="outside"
                  isRequired
                  variant="bordered"
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
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
                  autoComplete="off"
                  placeholder="Tus apellidos"
                  label="Apellidos"
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  startContent={<p className=" opacity-70">@</p>}
                  placeholder="username"
                  label="Nombre de usuario"
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="9999-9999"
                  label="Número de teléfono"
                  type="number"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
            <Controller
              name="documentNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="0601-1900-00000"
                  label="DNI"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={!!errors.documentNumber}
                  errorMessage={errors.documentNumber?.message}
                />
              )}
            />

            <DatePicker
              label="Fecha de nacimiento"
              labelPlacement="outside"
              variant="bordered"
              value={dateValue}
              onChange={(val) => {
                setDateValue(val)
                if (val) {
                  setValue(
                    'birthDate',
                    val.toDate(getLocalTimeZone()).toISOString(),
                    { shouldDirty: true }
                  )
                  return
                }
                setValue('birthDate', null, { shouldDirty: true })
              }}
            />
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              color="primary"
              type="submit"
              isDisabled={!isDirty || isPending}
            >
              Actualizar información
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
