import axios, { InternalAxiosRequestConfig } from 'axios'
import { decodeJwt } from 'jose'
import dayjs from 'dayjs'
import { useAuthStore } from '@/store/auth'
import api from './axios'

const baseURL = 'http://localhost:4000/api/v1'

const token = useAuthStore.getState().token

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${token}` },
})

axiosInstance.interceptors.request.use(
  async (req: InternalAxiosRequestConfig) => {
    // Verificamos si el token no ha expirado
    if (token) {
      const user = decodeJwt(token)
      const isExpired = user.exp
        ? dayjs.unix(user?.exp).diff(dayjs()) < 1
        : true
      if (!isExpired) return req
    }

    try {
      const newTokenResponse = await api.get('/auth/update_token')
      useAuthStore.getState().updateToken(newTokenResponse.data.data.token)

      req.headers.Authorization = `Bearer ${newTokenResponse.data.data.token}`
    } catch (error) {
      console.error('Error al solicitar un nuevo token:', error)
    }
    return req
  }
)

export default axiosInstance
