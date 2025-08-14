import axiosInstance from '@/lib/axiosClient'
import {
  AllUsersSchema,
  CountUserActivities,
  CreateUserSchema,
  DisableUserSchema,
  getAllRolesType,
  getPermissionsType,
  newRoleType,
  rolePermissions,
  roleType,
  UserSchema,
  ZAllRoles,
  ZAllUsers,
  ZCountUserActivities,
  ZDisableUser,
  ZGetPermissions,
  ZRole,
  ZRolePermissions,
  ZUser,
} from '@/types/users'
import { isAxiosError } from 'axios'

export async function getAllUsers(
  page: string,
  limit: string,
  query?: string,
  status?: string
) {
  try {
    const { data } = await axiosInstance.get<AllUsersSchema>(
      `/admin/users?page=${page}&limit=${limit}${query ? '&q=' + query : ''}${status ? '&status=' + status : ''}`
    )

    const validClient = ZAllUsers.parse(data)
    return validClient
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
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
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
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
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrió un error al obtener el rol.')
    }
  }
}
export async function getPermissions() {
  try {
    const { data } =
      await axiosInstance.get<getPermissionsType>('/admin/permissions')
    const validData = ZGetPermissions.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrió un error al obtener los permisos.')
    }
  }
}
export async function createRol(value: newRoleType) {
  try {
    const { data } = await axiosInstance.post<roleType>('/admin/rol', value)
    const validData = ZRole.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Error al crear el rol')
    }
  }
}
export async function updateRol({
  id,
  value,
}: {
  id: string
  value: newRoleType
}) {
  try {
    const { data } = await axiosInstance.post(`/admin/roles/${id}`, value)

    return data
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
    const { data } = await axiosInstance.get<UserSchema>(
      `/admin/user/${params}`
    )
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

export async function countUserActivities(userId: string) {
  try {
    const { data } = await axiosInstance.get<CountUserActivities>(
      `/admin/users/${userId}/activities`
    )
    const validData = ZCountUserActivities.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error(
        'Ocurrió un error al obtener las actividades del usuario.'
      )
    }
  }
}

type TDesableUser = {
  userId: string
  assingToId?: string
}
export async function disabledUser({ userId, assingToId }: TDesableUser) {
  try {
    const { data } = await axiosInstance.put<DisableUserSchema>(
      `/admin/user/${userId}/disable`,
      { assingToId }
    )
    const validData = ZDisableUser.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg || 'Error inesperado.')
    } else {
      throw new Error('Ocurrió un error al desactivar el usuario.')
    }
  }
}
type TActiveUser = {
  userId: string
}
export async function activeUser({ userId }: TActiveUser) {
  try {
    const { data } = await axiosInstance.put<DisableUserSchema>(
      `/admin/user/${userId}/reactive`
    )
    const validData = ZDisableUser.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.response?.msg || 'Error inesperado.')
    } else {
      throw new Error('Ocurrió un error al activar el usuario.')
    }
  }
}
