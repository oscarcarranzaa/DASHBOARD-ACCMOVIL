import axiosInstance from '@/lib/axiosClient'
import {
  AttributeSchema,
  newAttributeSchema,
  newTermSchema,
  ZAttributesAll,
  ZOneAttribute,
  ZOneAttributeSchema,
} from '@/types/attributes'

import { isAxiosError } from 'axios'

export async function getAllAttributes() {
  try {
    const { data } = await axiosInstance.get<AttributeSchema>(
      `/product/attribute/all`
    )
    const validProduct = ZAttributesAll.parse(data)
    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('An unexpected error occurred while get the product.')
    }
  }
}
export async function getOneAttribute(id: string) {
  try {
    const { data } = await axiosInstance.get<ZOneAttributeSchema>(
      `/product/attribute/${id}`
    )
    const validAtt = ZOneAttribute.parse(data)
    return validAtt
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('Error al obtener los items de los atributos.')
    }
  }
}
export async function newAttribute(formData: newAttributeSchema) {
  try {
    const { data } = await axiosInstance.post('/product/attribute', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Error al obtener los items de los atributos.')
    }
  }
}
export async function newTerm({
  formData,
  id,
}: {
  formData: newTermSchema
  id: string
}) {
  try {
    const { data } = await axiosInstance.post(
      `/product/attribute/${id}/terms`,
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Error al obtener los items de los atributos.')
    }
  }
}
