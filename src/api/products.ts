import axiosInstance from '@/lib/axiosClient'
import { getProduct, getProductSchema, newProduct } from '@/types/poducts'
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
export async function getAllProducts(page: string, limit: string) {
  try {
    const { data } = await axiosInstance.get<getProductSchema>(
      `/product?page=${page}&limit=${limit}`
    )

    const validProduct = getProduct.parse(data)

    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    }
  }
}
