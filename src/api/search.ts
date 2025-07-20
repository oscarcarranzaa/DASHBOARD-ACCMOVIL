import axiosInstance from '@/lib/axiosClient'
import { SearchAllType, ZSearchAll } from '@/types/search'
import { isAxiosError } from 'axios'

export async function getSearchAll(search: string) {
  try {
    const { data } = await axiosInstance.get<SearchAllType>(
      `/search?q=${search}`
    )
    const parseData = ZSearchAll.parse(data)
    return parseData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al obtener los resultados de la busqueda')
    }
  }
}
