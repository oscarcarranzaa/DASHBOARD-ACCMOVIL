import axiosInstance from '@/lib/axiosClient'
import {
  createCustomerSchema,
  getAllCustomerSchema,
  ZAllCustomer,
} from '@/types/customer'
import { isAxiosError } from 'axios'

export async function createCustomer(customerData: createCustomerSchema) {
  try {
    const { data } = await axiosInstance.post(
      'client/auth/create-account',
      customerData
    )
    const isCreated = data ? 'Cliente creado' : 'Error al crear el cliente'
    return isCreated
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al agregar el cliente.')
    }
  }
}
export async function getAllCustomer(
  page: string,
  limit: string,
  query?: string
) {
  try {
    const { data } = await axiosInstance.get<getAllCustomerSchema>(
      `/client/customer?page=${page}&limit=${limit}${query ? '&q=' + query : ''}`
    )

    const validClient = ZAllCustomer.parse(data)
    return validClient
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrió un error al obtener los clientes.')
    }
  }
}
