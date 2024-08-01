import axios from 'axios'
import { decodeJwt } from 'jose'
import dayjs from 'dayjs'
import { useAuthStore } from '@/store/auth'
import api from './axios'

const baseURL = 'http://localhost:4000/api/v1'

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(async (req) => {
  // Verificamos si el token no ha expirado
  try {
    const token = useAuthStore.getState().token

    if (token) {
      const { exp } = decodeJwt(token)
      const isExpired = exp ? dayjs.unix(exp).diff(dayjs()) < 1 : true
      if (!isExpired) {
        req.headers.Authorization = `Bearer ${token}`
        return req // Devuelve req después de asignar el token
      }
    }

    const newTokenResponse = await api.get('/auth/update_token')
    useAuthStore.getState().setToken(newTokenResponse.data.data.token)

    req.headers.Authorization = `Bearer ${newTokenResponse.data.data.token}`
    return req // Devuelve req con el nuevo token en el encabezado de autorización
  } catch (error) {
    console.error('Error al solicitar un nuevo token:', error)
    return Promise.reject(error) // Rechazar la promesa con el error
  }
})

export default axiosInstance
