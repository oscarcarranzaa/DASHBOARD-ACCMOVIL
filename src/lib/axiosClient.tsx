import axios, { isAxiosError } from 'axios'
import { decodeJwt } from 'jose'
import dayjs from 'dayjs'
import { useAuthStore } from '@/store/auth'
import api, { BASE_URL } from './axios'
import { tokenAuthSchema, ZTokenAuth } from '@/types/schemas'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const token = useAuthStore.getState().token

    if (token) {
      const { exp } = decodeJwt(token)
      const isExpired = exp ? dayjs.unix(exp).diff(dayjs()) < 1 : true
      if (!isExpired) {
        req.headers.Authorization = `Bearer ${token}`
        return req
      }
    }

    const { data } = await api.get<tokenAuthSchema>('/admin/auth/update-token')
    const validToken = ZTokenAuth.parse(data)

    useAuthStore.getState().setToken(validToken.data.token)
    useAuthStore.getState().setUser(validToken.data.user)
    req.headers.Authorization = `Bearer ${validToken.data.token}`
    return req
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Error al verificar tu usuario.')
    }
  }
})

export default axiosInstance
