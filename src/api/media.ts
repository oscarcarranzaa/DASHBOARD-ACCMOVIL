import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import { GetMediasSchema, getMedias } from '@/types/schemas'

export async function getDataMedias(page: string, limit: string) {
  try {
    const { data } = await axiosInstance.get<GetMediasSchema>(
      `/media?page=${page}&limit=${limit}`
    )
    const validData = getMedias.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
  }
}
