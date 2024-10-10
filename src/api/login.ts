import api from '@/lib/axios'
import { LoginSchema } from '@/types'
import { isAxiosError } from 'axios'

export async function loginUser(formData: LoginSchema) {
  try {
    const { data } = await api.post('/admin/auth/login', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const err = error.response.data?.response
        ? error.response.data?.response?.msg
        : 'Error al soliciar acceso.'
      throw new Error(err)
    }
  }
}
export async function logout() {
  try {
    const { data } = await api.get('/admin/auth/logout')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    }
  }
}
