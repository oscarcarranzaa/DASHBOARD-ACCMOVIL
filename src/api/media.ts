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
export async function uploadMedia(file: FormData) {
  console.log(file, 'jjj')
  try {
    const { data } = await axiosInstance.post(`/media/upload`, file)
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
  }
}

export async function deleteMedia(mediaId: string) {
  try {
    const { data } = await axiosInstance.delete(`/media/${mediaId}`)
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
  }
}
