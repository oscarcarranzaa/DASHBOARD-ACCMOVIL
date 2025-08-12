import axiosInstance from '@/lib/axiosClient'
import { ZGetAllStores, getAllStoresSchema } from '@/types/settings/stores'
import { isAxiosError } from 'axios'

export async function getStores() {
  try {
    const { data } =
      await axiosInstance.get<getAllStoresSchema>('/config/stores')
    const parseData = ZGetAllStores.parse(data)
    return parseData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('An unexpected error occurred while get stores.')
    }
  }
}
