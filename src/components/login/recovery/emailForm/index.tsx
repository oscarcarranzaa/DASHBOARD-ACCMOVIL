'use client'
import { Button, Input, Spinner } from '@heroui/react'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type TPropsEmailForm = {
  onSendEmail: (e: string) => void
  isPending?: boolean
  initialValues?: string
  error?: string
}
export default function EmailRecoveryForm({
  onSendEmail,
  isPending,
  initialValues,
  error,
}: TPropsEmailForm) {
  const [email, setEmail] = useState(initialValues || '')
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSendEmail(email)
  }
  return (
    <form onSubmit={handleForm}>
      <p className="text-center text-zinc-600 dark:text-zinc-300">
        Escribe tu correo electrónico para recuperar tu contraseña.
      </p>
      <div className="mt-20 px-5">
        <Input
          startContent={<Mail />}
          type="email"
          isDisabled={isPending}
          size="lg"
          radius="lg"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Escribe tu correo electrónico"
          label="Correo Electrónico"
          labelPlacement="outside"
          variant="bordered"
        />
        <p className="text-center text-danger mt-3 text-sm mb-4">{error}</p>
      </div>
      <p className="text-center text-zinc-600 dark:text-zinc-300 text-sm mb-10">
        Te enviaremos un código de confirmación a tú correo electrónico.
      </p>
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
            'Enviar'
          )}
        </Button>
        <Button
          href="/login"
          as={Link}
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
