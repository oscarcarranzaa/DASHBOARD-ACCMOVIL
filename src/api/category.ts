import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import {
  newCategoryForm,
  oneCategorySchema,
  ZCategories,
  ZCategorySchema,
  ZOneCategory,
} from '@/types/category'
import { resposeIdSchema, ZResponseId } from '@/types/schemas'
import { toast } from 'sonner'

export async function getCategories(id: string) {
  try {
    const { data } = await axiosInstance.get<ZCategorySchema>(
      `/posts/category${id ? '?parentID=' + id : ''}`
    )

    const validCategory = ZCategories.parse(data)

    return validCategory
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Hubo un error al obtener las categorías.')
    }
  }
}
export async function newCategory(formData: newCategoryForm) {
  try {
    const { data } = await axiosInstance.post<resposeIdSchema>(
      '/posts/category',
      formData
    )
    const validCategory = ZResponseId.parse(data)

    return validCategory
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Hubo un error al obtener las categorías.')
    }
  }
}
type updateCategoryProps = {
  formData: newCategoryForm
  id: string
}
export async function updateCategory({ formData, id }: updateCategoryProps) {
  try {
    const data = await toast.promise(
      axiosInstance.put(`/posts/category/${id}`, formData),
      {
        loading: 'Actualizando categoría...',
        success: () => 'Categoría actualizada.',
        error: 'Error al actualizar categoría.',
      }
    )

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
export async function deleteCategory(id: string) {
  try {
    const { data } = await axiosInstance.delete(`/posts/category/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Hubo un error al obtener las categorías.')
    }
  }
}
