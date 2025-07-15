'use client'

import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth'
import { useState } from 'react'
import { logout as logoutApi } from '@/api/login'

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { logoutUserToken } = useAuthStore()

  const [isPending, setIsPending] = useState(false)

  const logout = async () => {
    setIsPending(true)
    try {
      // Llama al backend para cerrar sesión
      await logoutApi()

      // Limpia el cache
      await queryClient.clear()

      // Limpia el estado global
      logoutUserToken()

      // Redirige
      router.push('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      setIsPending(false)
    }
  }

  return { logout, isPending }
}
