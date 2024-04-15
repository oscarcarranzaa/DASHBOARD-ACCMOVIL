import api from '@/lib/axios'
import { LoginSchema } from '@/types'
import { isAxiosError } from 'axios'

export async function loginUser(formData: LoginSchema) {
  try {
    const { data } = await api.post('/team/login', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    }
  }
}
