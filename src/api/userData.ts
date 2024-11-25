import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import { UserSchema, user } from '@/types/schemas'
import { editProfileInfoSchema } from '@/types/users'

export async function userData() {
  try {
    const { data } = await axiosInstance.get<UserSchema>('/admin/user')
    const validData = user.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
  }
}
export async function updateUserInfo(userInfo: editProfileInfoSchema) {
  try {
    const { data } = await axiosInstance.patch<UserSchema>(
      '/admin/user/update-info',
      userInfo
    )
    const validData = user.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response?.data?.response?.msg || 'Error desconocido',
        {
          cause: error.response.status,
        }
      )
    } else {
      throw new Error('Error al actualizar el usuario.')
    }
  }
}
export async function updateUserAvatar(formData: FormData) {
  try {
    const { data } = await axiosInstance.patch(
      '/admin/user/update-avatar',
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
      throw new Error('Error al actualizar la foto de perfil.')
    }
  }
}
