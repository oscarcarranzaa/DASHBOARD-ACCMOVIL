import axiosInstance from '@/lib/axiosClient'
import { newProduct } from '@/types/poducts'
import { isAxiosError } from 'axios'

export async function createProduct(formData: newProduct) {
  try {
    const { data } = await axiosInstance.post('/product', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    }
  }
}
