import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import { ZCategories, ZCategorySchema } from '@/types/category'

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
