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
    // Obtener el token del estado global de Zustand

    // Decodificar el token JWT para verificar su expiración
    console.log(token)
    if (token) {
      const user = decodeJwt(token)
      const isExpired = user.exp
        ? dayjs.unix(user?.exp).diff(dayjs()) < 1
        : true
      // Si el token no está expirado, simplemente devolvemos la solicitud
      if (!isExpired) return req
    }

    try {
      const newTokenResponse = await api.get('/auth/update_token')
      useAuthStore.getState().updateToken(newTokenResponse.data.data.token)
      // Actualizar el token en el estado global de Zustand

      // Establecer el nuevo token en la cabecera de autorización de la solicitud
      req.headers = req.headers
      req.headers.Authorization = `Bearer ${newTokenResponse.data.data.token}`
    } catch (error) {
      // Manejar errores al solicitar un nuevo token
      console.error('Error al solicitar un nuevo token:', error)
    }

    return req
  }
)

export default axiosInstance
