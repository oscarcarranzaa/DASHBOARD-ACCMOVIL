import axiosInstance from '@/lib/axiosClient'
import { changePassSchema } from '@/types/users'
import { isAxiosError } from 'axios'

export async function changePass(formData: changePassSchema) {
  try {
    const { data } = await axiosInstance.patch(
      '/admin/auth/change-password',
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response?.data?.response?.msg || 'Error desconocido',
        {
          cause: error.response.status,
        }
      )
    } else {
      throw new Error('Error al actualizar la contraseña')
    }
  }
}
