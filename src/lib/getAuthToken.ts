'use client'
import { useAuthStore } from '@/store/auth'
import api from './axios'
import { decodeJwt } from 'jose'
import dayjs from 'dayjs'
import { AxiosError } from 'axios'
import { logout } from '@/api/login'
import { redirectToLogin } from '@/utils/redirectToLogin'

let refreshing: Promise<string> | null = null

export const getAuthToken = async (): Promise<string> => {
  const { token, setToken, setUser, setError, logoutUserToken } =
    useAuthStore.getState()

  const isValid = (token?: string | null) => {
    if (!token) return false
    const { exp } = decodeJwt(token)
    return exp ? dayjs.unix(exp).isAfter(dayjs()) : false
  }

  // Si el token es válido, devuélvelo
  if (isValid(token)) return token!

  // Si ya hay una petición en curso, espera a que termine
  if (refreshing) return refreshing

  // Si no hay una petición activa, lánzala
  refreshing = (async () => {
    console.log('run')
    try {
      const { data } = await api.get('/admin/auth/update-token')
      const newToken = data.data.token
      setToken(newToken)
      setUser(data.data.user)
      refreshing = null
      return newToken
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setError('Token expirado')
          await logout()
          logoutUserToken()
          redirectToLogin()
        }
      }
    }
  })()

  return refreshing
}
