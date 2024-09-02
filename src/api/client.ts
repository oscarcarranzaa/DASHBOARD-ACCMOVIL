import axiosInstance from '@/lib/axiosClient'
import { AllUsersSchema, UserSchema, ZAllUsers, ZUser } from '@/types/users'
import { isAxiosError } from 'axios'

export async function getAllClients(
  page: string,
  limit: string,
  query?: string
) {
  try {
    const { data } = await axiosInstance.get<AllUsersSchema>(
      `/users?page=${page}&limit=${limit}${query ? '&q=' + query : ''}`
    )
    const validClient = ZAllUsers.parse(data)
    return validClient
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener los clientes.')
    }
  }
}
export async function getOneClient(params: string) {
  try {
    const { data } = await axiosInstance.get<UserSchema>(`/user/${params}`)
    const validClient = ZUser.parse(data)
    return validClient
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener el cliente.')
    }
  }
}
