'use client'
import LoginForm from '@/components/forms/login'
import Image from 'next/image'
import { Link } from '@heroui/react'

export default function Login() {
  return (
    <div className="flex flex-col gap-5 min-h-screen  bg-zinc-100 dark:bg-zinc-950">
      <header className="flex justify-center p-3 bg-white dark:bg-zinc-900">
        <Image
          src="/static/logo.webp"
          width={180}
          height={30}
          alt="Accmovil Logo"
          priority
        />
      </header>
      <main className=" min-h-screen bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-[500px] m-auto p-2 md:p-8 rounded-xl md:bg-white md:dark:bg-zinc-900 md:shadow-lg">
          <div className="p-3 w-full">
            <h2 className="text-3xl font-bold mb-5 text-center text-zinc-800 dark:text-white">
              Iniciar sesión
            </h2>
            <LoginForm />
            <div className="flex justify-center mt-5 text-sm">
              <Link href={'/recovery'}>¿Olvidaste tu contraseña?</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
