import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import {
  GetMediasSchema,
  GetOneMediaSchema,
  getMedias,
  getOneMediaData,
} from '@/types/schemas'

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
export async function getOneMedia(mediaID: string) {
  try {
    const { data } = await axiosInstance.get<GetOneMediaSchema>(
      `/media/${mediaID}`
    )
    const validData = getOneMediaData.parse(data)
    console.log(validData)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
  }
}
type IEditMedia = {
  mediaID: string
  title: string
}
export async function editOneMedia(dataMedia: IEditMedia) {
  try {
    const { data } = await axiosInstance.put<string>(
      `/media/${dataMedia.mediaID}`,
      { title: dataMedia.title }
    )
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
