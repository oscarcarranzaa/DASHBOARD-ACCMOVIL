'use client'
import { Button, Input, Spinner } from '@heroui/react'
import { Eye, EyeClosed, EyeOff, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm, Controller, Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ZChangeRecoveryPassword,
  changeRecoveryPasswordType,
} from '@/types/auth'

type TPropsEmailForm = {
  onSendPassword: (e: string) => void
  isPending?: boolean
  error?: string
  onBack: () => void
}

export default function ChangePasswordRecovery({
  onSendPassword,
  isPending,
  error,
  onBack,
}: TPropsEmailForm) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const initialValues = {
    password: '',
    confirmPass: '',
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<changeRecoveryPasswordType>({
    resolver: zodResolver(ZChangeRecoveryPassword),
    defaultValues: initialValues,
  })

  const toggleShowPassword = () => setShowPassword((prev) => !prev)
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev)

  const handleForm = (data: changeRecoveryPasswordType) => {
    onSendPassword(data.password)
  }
  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <p className="text-center text-zinc-600 dark:text-zinc-300">
        Elija una nueva contraseña segura y recuerde que no debe compartirse con
        nadie.
      </p>
      <div className="mt-10 px-5 flex flex-col gap-5">
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              isRequired
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...field}
              endContent={
                <button
                  onClick={toggleShowPassword}
                  aria-label="toggle password visibility"
                  type="button"
                  className="focus:outline-hidden"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              }
              type={showPassword ? 'text' : 'password'}
              isDisabled={isPending}
              size="lg"
              radius="lg"
              name="password"
              placeholder="Escribe tu contraseña"
              label="Contraseña"
              labelPlacement="outside"
              variant="bordered"
            />
          )}
        />
        <Controller
          name="confirmPass"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              isRequired
              errorMessage={errors.confirmPass?.message}
              isInvalid={!!errors.confirmPass}
              endContent={
                <button
                  onClick={toggleShowConfirmPassword}
                  aria-label="toggle password visibility"
                  type="button"
                  className="focus:outline-hidden"
                >
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </button>
              }
              type={showConfirmPassword ? 'text' : 'password'}
              isDisabled={isPending}
              size="lg"
              radius="lg"
              name="confirmPass"
              placeholder="Confirma tu contraseña"
              label="Confirmar Contraseña"
              labelPlacement="outside"
              variant="bordered"
            />
          )}
        />
        <p className="text-center text-danger mt-3 text-sm mb-4">{error}</p>
      </div>

      <div className="flex flex-col gap-2 px-5">
        <Button
          color="primary"
          size="lg"
          radius="full"
          isDisabled={isPending}
          type="submit"
        >
          {isPending ? (
            <Spinner variant="simple" color="white" size="sm" />
          ) : (
            'Cambiar contraseña'
          )}
        </Button>
        <Button
          onPress={onBack}
          variant="ghost"
          className="w-full"
          size="lg"
          radius="full"
        >
          Volver
        </Button>
      </div>
    </form>
  )
}
