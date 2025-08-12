import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import {
  UserOwnerSchema,
  UserTokenSchema,
  ZUserOwner,
  ZUserToken,
  editProfileInfoSchema,
} from '@/types/users'
import api from '@/lib/axios'

export async function userData() {
  try {
    const { data } = await axiosInstance.get<UserOwnerSchema>('/admin/user')
    const validData = ZUserOwner.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
    console.log(error)
    throw new Error('Error al obtener el usuario.')
  }
}
export async function updateUserInfo(userInfo: editProfileInfoSchema) {
  try {
    const { data } = await axiosInstance.patch<UserOwnerSchema>(
      '/admin/user/update-info',
      userInfo
    )
    const validData = ZUserOwner.parse(data)
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
