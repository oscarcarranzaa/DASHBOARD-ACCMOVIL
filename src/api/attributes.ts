import axiosInstance from '@/lib/axiosClient'
import { AttributeSchema, ZAttributesAll } from '@/types/attributes'

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
