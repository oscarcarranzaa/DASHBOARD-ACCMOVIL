import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import {
  newCategoryForm,
  oneCategorySchema,
  ZCategories,
  ZCategorySchema,
  ZOneCategory,
} from '@/types/category'

export async function getCategories(id: string) {
  try {
    const { data } = await axiosInstance.get<ZCategorySchema>(
      `/posts/category?parentID=${id}`
    )

    const validCategory = ZCategories.parse(data)

    return validCategory
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('Hubo un error al obtener las categorías.')
    }
  }
}
export async function newCategory(formData: newCategoryForm) {
  try {
    const { data } = await axiosInstance.post('/posts/category', formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Hubo un error al obtener las categorías.')
    }
  }
}
export async function getOneCategories(id: string) {
  try {
    const { data } = await axiosInstance.get<oneCategorySchema>(
      `/posts/category/${id}`
    )
    const validCategory = ZOneCategory.parse(data)
    return validCategory
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Hubo un error al obtener las categorías.')
    }
  }
}
