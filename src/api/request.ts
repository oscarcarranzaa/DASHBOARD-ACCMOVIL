import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'

export async function getProduct() {
  try {
    const { data } = await axiosInstance.get(
      '/product/6612fccdad744a2fa2cc3058'
    )
    return data
  } catch (error) {
    console.log(error)
    console.log('h')
    if (isAxiosError(error) && error.response) {
      throw new Error(error.message)
    }
  }
}
