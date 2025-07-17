'use client'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/api/login'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { LoginSchema, login } from '@/types'
import ErrorsMessage from './errorsMessage'
import { useState } from 'react'
import Spinner from '../icons/spinner'
import { Button, Input } from '@heroui/react'
import { Controller } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginForm() {
  const [see, setSee] = useState(false)
  const initialValues: LoginSchema = {
    email: '',
    password: '',
  }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(login), defaultValues: initialValues })
  const router = useRouter()

  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      if (user) {
        setToken(user.data.token)
        setUser(user.data.user)
        router.push('/dash/dashboard')
      }
    },
  })

  const handleForm = (formData: LoginSchema) => mutate(formData)

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <p className="text-center text-lg font-semibold text-zinc-600 dark:text-zinc-300">
          ¡Bienvenido de nuevo!
        </p>
        <p className="text-center text-sm mb-10 text-zinc-600 dark:text-zinc-300">
          Inicie sesión con sus credenciales para continuar.
        </p>
        <div className="mb-5 flex flex-col gap-2">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                type="email"
                placeholder="Ingrese su correo"
                label="Correo electrónico"
                size="lg"
                labelPlacement="outside"
                variant="bordered"
              />
            )}
          />
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                endContent={
                  <button
                    onClick={() => setSee(!see)}
                    aria-label="toggle password visibility"
                    type="button"
                    className="focus:outline-hidden"
                  >
                    {see ? <Eye /> : <EyeOff />}
                  </button>
                }
                autoComplete="off"
                isRequired
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                type={see ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                label="Contraseña"
                size="lg"
                labelPlacement="outside"
                variant="bordered"
              />
            )}
          />
          <div className=" h-14">
            {error && <ErrorsMessage>{error.message}</ErrorsMessage>}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          color="primary"
          size="lg"
          className="w-full"
          radius="full"
        >
          {isPending ? (
            <div className="animate-spin w-7 h-7 flex items-center justify-center">
              <Spinner size={28} fill="#ffffff" />
            </div>
          ) : (
            'Iniciar sesión'
          )}
        </Button>
      </form>
    </>
  )
}
