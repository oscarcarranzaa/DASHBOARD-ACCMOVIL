import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import { CategorySchema, ZCategory } from '@/types/category'

export async function getCategories() {
  try {
    const { data } = await axiosInstance.get<CategorySchema>(`/posts/category`)
    const validCategory = ZCategory.parse(data)
    return validCategory
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('Hubo un error al obtener las categorías.')
    }
  }
}
