'use client'

import { UserSchema, ZEditUser } from '@/types/users'
import DisableUser from '../../disable'
import ActiveUser from '../../active'
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  Checkbox,
  DateInput,
  Input,
  Select,
  SelectItem,
  Skeleton,
  addToast,
} from '@heroui/react'
import { cn } from '@/lib/utils'
import { ExternalLink, Key, ReceiptText, ScanEye, Settings } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { editUser, getAllRoles } from '@/api/users'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'

import Spinner from '@/components/icons/spinner'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type TProps = {
  user: UserSchema
}
export default function EditUser({ user }: TProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [previousUser, setPreviousUser] = useState<UserSchema | null>(user)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getAllRoles(),
    refetchOnWindowFocus: false,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm<z.input<typeof ZEditUser>>({
    resolver: zodResolver(ZEditUser),
    defaultValues: user,
  })

  useEffect(() => {
    reset(user)
  }, [user, reset])

  const { mutate, isPending } = useMutation({
    mutationFn: editUser,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['user', user.username] })
      const previousUser = queryClient.getQueryData(['user', user.username])
      queryClient.setQueryData(
        ['user', user.username],
        (oldUser: UserSchema) => {
          if (!oldUser) return oldUser
          return {
            ...oldUser,
            ...newData.userData,
          }
        }
      )
      return { previousUser }
    },
    onSuccess: (success) => {
      reset(success)
      queryClient.setQueryData(
        ['user', user.username],
        (oldUser: UserSchema) => {
          if (!oldUser) return oldUser
          return success
        }
      )
      if (success.username !== previousUser?.username) {
        router.replace(`/dash/usuarios/${success.username}`)
      }
      setPreviousUser(success)
      addToast({
        title: 'Usuario editado',
        description: 'El usuario se edito correctamente',
        color: 'success',
        variant: 'bordered',
        timeout: 3000,
      })
    },
    onError: (err, _newData, context) => {
      addToast({
        title: 'Error al editar el usuario',
        description: err.message,
        color: 'danger',
        timeout: 3000,
        variant: 'bordered',
      })
      queryClient.setQueryData(['user', user.username], context?.previousUser)
      if (context?.previousUser) {
        reset(context.previousUser)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user.username] })
    },
  })

  const renderSelectRol = () => {
    if (data && data.length === 0) {
      return (
        <Alert
          color="warning"
          title="No hay roles disponibles"
          description={
            <div className="flex gap-1">
              <p>
                Puedes ir a{' '}
                <Link
                  href="/dash/usuarios/roles/nuevo"
                  className="inline-flex items-center gap-1 text-blue-500 hover:underline"
                >
                  crear roles
                  <span className="flex-none">
                    <ExternalLink size={14} />
                  </span>
                </Link>
                , Si no le asignas un rol, el usuario por defecto tendrá
                permisos de administrador.
              </p>
            </div>
          }
        ></Alert>
      )
    }
    if (error && !isLoading) {
      return (
        <Alert
          color="danger"
          title="Error"
          description={
            <div>
              <p>
                Hubo un error al cargar los roles{' '}
                <span
                  className="underline cursor-pointer"
                  onClick={() => refetch()}
                >
                  Reintentar
                </span>
              </p>
            </div>
          }
        ></Alert>
      )
    }
    if (isLoading) {
      return <Skeleton className="w-full h-10 rounded-lg" />
    }
    return (
      <Controller
        control={control}
        name="roleId"
        render={({ field: { value, onChange, ...field } }) => (
          <Select
            isLoading={isLoading}
            items={data}
            {...field}
            isDisabled={user?.is_user_root}
            aria-label="Selecciona un rol"
            placeholder="Selecciona un rol"
            selectionMode="single"
            onSelectionChange={(keys) => onChange(keys.anchorKey)}
            selectedKeys={value ? [value] : []}
            popoverProps={{
              classNames: {
                base: 'before:bg-default-200',
                content: 'p-0 border-small border-divider bg-background',
              },
            }}
            variant="bordered"
          >
            {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
          </Select>
        )}
      />
    )
  }
  const submitForm = (data: z.infer<typeof ZEditUser>) => {
    mutate({ userData: data, id: user.id })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className=" relative  border dark:bg-gray-950 bg-gray-100 dark:border-zinc-800 border-zinc-400 rounded-2xl overflow-hidden  "
      >
        <div className="overflow-y-auto overflow-x-hidden pb-3 h-[calc(100vh-(var(--header-height))-15rem)] mb-2">
          <div className="p-2 flex gap-3 items-center">
            <Settings />
            <h3 className="text-lg font-semibold">Ajustes del usuario</h3>
          </div>
          <div className="flex flex-col gap-4 mt-4 px-2 ">
            <Controller
              control={control}
              name="is_owner"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  isSelected={value}
                  onChange={onChange}
                  color="success"
                  aria-label="Configuraciones de la cuenta"
                  isDisabled={user?.is_user_root}
                  classNames={{
                    base: cn(
                      'inline-flex  m-0 bg-content1 p-3',
                      'hover:bg-content2 items-center justify-start',
                      'cursor-pointer rounded-lg gap-2  border-2 border-zinc-300 dark:border-zinc-700 ',
                      'data-[selected=true]:border-success data-[selected=true]:dark:border-success'
                    ),
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <div className="flex-none">
                      <Key size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">
                      Configuraciones de la cuenta
                    </h3>
                  </div>
                  <p className="text-sm mt-2 opacity-80">
                    Configura los permisos de la cuenta, gestiona usuarios y
                    otras areas de alto rango.
                  </p>
                </Checkbox>
              )}
            />
            <div className="flex flex-col border-2 border-zinc-300 bg-content1 dark:border-zinc-700 p-2  px-4 rounded-lg ">
              <div className="flex gap-3 items-center">
                <div className="flex-none">
                  <ScanEye size={20} />
                </div>
                <h3 className="text-lg font-semibold">Rol y permisos</h3>
              </div>
              <p className="text-sm mt-2 opacity-80">
                Selecciona el rol de permisos para el usuario.
              </p>
              <div className="mt-3">{renderSelectRol()}</div>
            </div>

            <div className="">
              <Accordion
                className="bg-content1 rounded-lg"
                variant="bordered"
                defaultExpandedKeys={['1']}
              >
                <AccordionItem
                  startContent={<ReceiptText size={20} />}
                  key="1"
                  title="Información personal"
                  subtitle="Detalla los datos personales del usuario."
                >
                  <div className="flex flex-col gap-3">
                    <Controller
                      control={control}
                      name="firstName"
                      aria-label="Nombre"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          errorMessage={errors.firstName?.message}
                          isInvalid={!!errors.firstName}
                          placeholder="Ej: Oscar"
                          label="Nombre"
                          labelPlacement="outside"
                          isRequired
                          variant="bordered"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="lastName"
                      aria-label="Apellidos"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          errorMessage={errors.lastName?.message}
                          isInvalid={!!errors.lastName}
                          placeholder="Ej: Carranza"
                          label="Apellidos"
                          labelPlacement="outside"
                          isRequired
                          variant="bordered"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      aria-label="Nombre de usuario"
                      name="username"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          errorMessage={errors.username?.message}
                          isInvalid={!!errors.username}
                          placeholder="Ej: oscarcarranza"
                          label="Nombre de usuario"
                          labelPlacement="outside"
                          isRequired
                          variant="bordered"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="job"
                      aria-label="Puesto"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Ej: Desarrollador"
                          label="Puesto"
                          errorMessage={errors.job?.message}
                          isInvalid={!!errors.job}
                          labelPlacement="outside"
                          isRequired
                          variant="bordered"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="phone"
                      aria-label="Teléfono"
                      rules={{ required: true }}
                      render={({ field: { value, ...field } }) => (
                        <Input
                          {...field}
                          errorMessage={errors.phone?.message}
                          isInvalid={!!errors.phone}
                          value={value ?? ''}
                          placeholder="Ej: 99998888"
                          label="Teléfono"
                          labelPlacement="outside"
                          variant="bordered"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="documentNumber"
                      aria-label="Identificación"
                      rules={{ required: true }}
                      render={({ field: { value, ...field } }) => (
                        <Input
                          {...field}
                          errorMessage={errors.documentNumber?.message}
                          isInvalid={!!errors.documentNumber}
                          value={value ?? ''}
                          placeholder="Ej: 12345678"
                          label="Identificación"
                          labelPlacement="outside"
                          variant="bordered"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="birthDate"
                      aria-label="Fecha de nacimiento"
                      rules={{ required: true }}
                      render={({ field: { value, onChange, ...field } }) => (
                        <DateInput
                          granularity="day"
                          {...field}
                          errorMessage={(value) => {
                            if (value.isInvalid) {
                              return 'Ingrese una fecha valida.'
                            }
                            return errors.birthDate?.message
                          }}
                          defaultValue={
                            value ? parseDate(value.split('T')[0]) : null
                          }
                          minValue={parseDate('1900-01-01')}
                          maxValue={today(getLocalTimeZone())}
                          onChange={(value) => {
                            if (!value) return
                            if (value.year < 1900) return
                            const formattedDate = value.toDate('UTC')
                            const formatterIso = formattedDate.toISOString()
                            onChange(formatterIso)
                          }}
                          label="Fecha de nacimiento"
                          labelPlacement="outside"
                          variant="bordered"
                        />
                      )}
                    />
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <footer className="">
            <div className="flex absolute bg-white border-t dark:border-zinc-700 dark:bg-zinc-950 bottom-0 flex-col gap-2 left-0 right-0 p-2 py-3">
              <div className="flex">
                {user.status === 'ACTIVE' ? (
                  <DisableUser
                    user={user}
                    button={'Desactivar usuario'}
                    buttonProps={{
                      className: 'w-full',
                      variant: 'bordered',
                      color: 'danger',
                    }}
                  />
                ) : (
                  <ActiveUser
                    user={user}
                    button={'Reactivar usuario'}
                    buttonProps={{
                      variant: 'bordered',
                      className: 'w-full',
                      color: 'success',
                    }}
                  />
                )}
              </div>
              <Button
                type="submit"
                isDisabled={!isDirty || isPending}
                className="w-full dark:bg-primary-300 bg-primary-500 text-white"
              >
                {isPending ? <Spinner size={20} fill="#fff" /> : 'Editar'}
              </Button>
            </div>
          </footer>
        </div>
        <div className="h-28"></div>
      </form>
    </div>
  )
}
