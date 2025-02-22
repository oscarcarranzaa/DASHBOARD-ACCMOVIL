import { changePass } from '@/api/auth'
import EyeSVG from '@/components/icons/eye'
import EyeInvisibleSVG from '@/components/icons/eyeInvisible'
import Spinner from '@/components/icons/spinner'
import { changePassSchema, ZChangePassword } from '@/types/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from "@heroui/react"
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TProps = {
  onSuccessForm?: () => void
}
export default function ChangePasswordForm({ onSuccessForm }: TProps) {
  const [isVisibleCurrentPass, setIsVisibleCurrentPass] = useState(false)
  const [isVisibleNewPass, setIsVisibleNewPass] = useState(false)

  const defaultValues = {
    currentPass: '',
    newPass: '',
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<changePassSchema>({
    resolver: zodResolver(ZChangePassword),
    defaultValues,
  })
  const { mutate, isPending, error } = useMutation({
    mutationFn: changePass,
    onSuccess: () => {
      if (onSuccessForm) {
        onSuccessForm()
      }
      reset({ currentPass: '', newPass: '' })
      toast.success('Contraseña actualizada')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const submitPass = (pass: changePassSchema) => {
    mutate(pass)
  }
  return (
    <form className="grid gap-5" onSubmit={handleSubmit(submitPass)}>
      <Controller
        name="currentPass"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            autoComplete="off"
            placeholder="********"
            label="Contraseña actual"
            isRequired
            labelPlacement="outside"
            variant="bordered"
            isInvalid={!!errors.currentPass}
            endContent={
              <button
                title={isVisibleCurrentPass ? 'Ocultar' : 'Ver'}
                type="button"
                className={
                  !!errors.currentPass
                    ? 'fill-danger'
                    : 'dark:fill-zinc-300 fill-zinc-700'
                }
                onClick={() => {
                  setIsVisibleCurrentPass(!isVisibleCurrentPass)
                }}
              >
                {isVisibleCurrentPass ? (
                  <EyeInvisibleSVG size={24} />
                ) : (
                  <EyeSVG size={24} />
                )}
              </button>
            }
            type={isVisibleCurrentPass ? 'text' : 'password'}
          />
        )}
      />
      <Controller
        name="newPass"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            autoComplete="off"
            placeholder="********"
            label="Nueva contraseña"
            isRequired
            labelPlacement="outside"
            isInvalid={!!errors.newPass}
            endContent={
              <button
                type="button"
                className={
                  !!errors.newPass
                    ? 'fill-danger'
                    : 'dark:fill-zinc-300 fill-zinc-700'
                }
                title={isVisibleNewPass ? 'Ocultar' : 'Ver'}
                onClick={() => {
                  setIsVisibleNewPass(!isVisibleNewPass)
                }}
              >
                {isVisibleNewPass ? (
                  <EyeInvisibleSVG size={24} />
                ) : (
                  <EyeSVG size={24} />
                )}
              </button>
            }
            variant="bordered"
            type={isVisibleNewPass ? 'text' : 'password'}
          />
        )}
      />
      <div>
        <p
          className={`text-xs  font-medium ${!!errors.currentPass || !!errors.newPass || error ? 'text-danger opacity-100 ' : 'opacity-70'}`}
        >
          {error
            ? error.message
            : 'La contraseña debe tener entre 8 y 32 caracteres, e incluir al menos una letra minúscula, una letra mayúscula y un número, la nueva no debe ser igual a la contraseña actual.'}
        </p>
        <div className="mt-5">
          <Button className="w-full" color="primary" type="submit">
            {isPending && <Spinner fill="#fff" size={24} />}
            Guardar
          </Button>
        </div>
      </div>
    </form>
  )
}
