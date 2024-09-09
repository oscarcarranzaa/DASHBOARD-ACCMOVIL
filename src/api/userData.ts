import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import { UserSchema, user } from '@/types/schemas'

export async function userData() {
  try {
    const { data } = await axiosInstance.get<UserSchema>('/admin/user')
    const validData = user.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
  }
}
