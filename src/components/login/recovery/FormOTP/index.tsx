'use client'
import { Button, InputOtp, Spinner } from '@heroui/react'
import Link from 'next/link'
import { useState } from 'react'

type TProps = {
  initialValues?: string
  isPending?: boolean
  error?: string
  onSendOTP: (otp: string) => void
  onBack: () => void
}
export default function FormOTPRecovery({
  onSendOTP,
  onBack,
  isPending,
  error,
  initialValues,
}: TProps) {
  const [value, setValue] = useState(initialValues || '')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSendOTP(value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <p className="text-center mt-10 text-zinc-600 dark:text-zinc-300 px-5">
        Se ha enviado un código de verificación a tu dirección de correo
        electrónico
      </p>
      <div className="mb-10 w-full flex flex-col items-center justify-center mt-5 px-5">
        <InputOtp
          length={6}
          size="lg"
          variant="bordered"
          isRequired
          value={value}
          errorMessage="Código OTP inválido"
          isDisabled={isPending}
          onValueChange={setValue}
        />
        <p className="text-center text-danger mt-3 text-sm mb-4">{error}</p>
      </div>

      <div className="flex flex-col gap-2 px-5">
        <Button
          className="w-full"
          color="primary"
          size="lg"
          radius="full"
          isDisabled={isPending || value.length !== 6}
          type="submit"
        >
          {isPending ? (
            <Spinner variant="simple" color="white" size="sm" />
          ) : (
            'Enviar'
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

        <button
          className="text-center text-blue-600 mt-5 text-sm hover:underline"
          type="button"
          onClick={onBack}
        >
          ¿No recibiste el código?
        </button>
      </div>
    </form>
  )
}
