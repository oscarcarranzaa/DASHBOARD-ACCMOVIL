'use client'
import RecoveryPassword from '@/components/login/recovery'
import Image from 'next/image'

export default function Recovery() {
  return (
    <>
      <div className="flex flex-col gap-5 min-h-screen  bg-zinc-50 dark:bg-zinc-950">
        <header className="flex justify-center p-3 bg-white dark:bg-zinc-900">
          <Image
            src="/static/logo.webp"
            width={180}
            height={30}
            alt="Accmovil Logo"
            priority
          />
        </header>
        <main>
          <div className="flex justify-center max-w-[500px] mb-20 m-auto dark:bg-zinc-900 bg-white shadow-lg rounded-xl">
            <div className="p-5 py-20 w-full">
              <h2 className="text-3xl font-bold mb-4 text-center text-zinc-800 dark:text-white">
                Recuperar Contraseña
              </h2>
              <RecoveryPassword />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
