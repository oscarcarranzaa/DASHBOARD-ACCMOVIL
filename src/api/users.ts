import axiosInstance from '@/lib/axiosClient'
import {
  AllUsersSchema,
  CreateUserSchema,
  getAllRolesType,
  rolePermissions,
  UserSchema,
  ZAllRoles,
  ZAllUsers,
  ZRolePermissions,
  ZUser,
} from '@/types/users'
import { isAxiosError } from 'axios'

export async function getAllUsers(page: string, limit: string, query?: string) {
  try {
    const { data } = await axiosInstance.get<AllUsersSchema>(
      `/admin/users?page=${page}&limit=${limit}${query ? '&q=' + query : ''}`
    )
    const validClient = ZAllUsers.parse(data)
    return validClient
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener los usuarios.')
    }
  }
}
export async function getAllRoles() {
  try {
    const { data } = await axiosInstance.get<getAllRolesType>('/admin/roles')
    const validClient = ZAllRoles.parse(data)
    return validClient
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener los roles de los usuarios.')
    }
  }
}
export async function getOneRol(id: string) {
  try {
    const { data } = await axiosInstance.get<rolePermissions>(
      `/admin/roles/${id}`
    )
    const validData = ZRolePermissions.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener el rol.')
    }
  }
}
export async function getOneUser(params: string) {
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
export async function createUser(userData: CreateUserSchema) {
  try {
    const { data } = await axiosInstance.post(
      '/admin/auth/create-user',
      userData
    )
    const isCreated = data ? 'Usuario creado' : 'Error al crear usuario'
    return isCreated
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener el cliente.')
    }
  }
}
