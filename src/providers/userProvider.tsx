'use client'
import { useAuthStore } from '@/store/auth'
import { Button } from '@heroui/react'

export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, error } = useAuthStore()

  if (error) {
    console.log(error)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center text-center p-5">
        <p className="text-red-500 text-lg mb-4">
          Ups! Ocurrió un error al cargar los datos del usuario.
        </p>
        <Button onPress={() => window.location.reload()} color="primary">
          Reintentar
        </Button>
      </div>
    )
  }
  return children
}
