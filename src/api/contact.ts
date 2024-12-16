import axiosInstance from '@/lib/axiosClient'
import {
  contactSchema,
  createContactSchema,
  createCustomerSchema,
  getAllContactSchema,
  getAllCustomerSchema,
  updateDataContactSchema,
  ZAllContacts,
  ZAllCustomer,
  ZContact,
} from '@/types/customer'
import { isAxiosError } from 'axios'

export async function createContact(contact: createContactSchema) {
  try {
    const { data } = await axiosInstance.post<contactSchema>(
      '/admin/contact',
      contact
    )

    const validContact = ZContact.parse(data)
    return validContact
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error en la transmición de datos.')
    }
  }
}
export async function getAllsContacts({
  page,
  limit,
  query,
  status,
}: {
  page: string
  limit: string
  query?: string
  status?: string
}) {
  try {
    const { data } = await axiosInstance.get<getAllContactSchema>(
      `/admin/contact?page=${page}&limit=${limit}${query ? '&q=' + query : ''}${status ? '&status=' + status : ''}`
    )
    const validContact = ZAllContacts.parse(data)
    return validContact
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener los contactos.')
    }
  }
}
export async function getOneContact(id: string) {
  try {
    const { data } = await axiosInstance.get<contactSchema>(
      `/admin/contact/${id}`
    )

    const validContact = ZContact.parse(data)
    return validContact
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error en la transmición de datos.')
    }
  }
}
export async function updateContactData({
  contact,
  id,
}: {
  id: string
  contact: {
    [key: string]: string | undefined
  }
}) {
  try {
    const { data } = await axiosInstance.put<contactSchema>(
      `/admin/contact/${id}`,
      contact
    )

    const validContact = ZContact.parse(data)
    return validContact
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error en la transmición de datos.')
    }
  }
}
