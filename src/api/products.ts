import axiosInstance from '@/lib/axiosClient'
import {
  getProduct,
  getProductSchema,
  newProduct,
  getProductImageSchema,
  getProductImage,
} from '@/types/poducts'
import { isAxiosError } from 'axios'

export async function createProduct(formData: newProduct) {
  try {
    const { data } = await axiosInstance.post('/product', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('An unexpected error occurred while get the product.')
    }
  }
}
export async function getAllProducts(
  page: string,
  limit: string,
  query?: string
) {
  try {
    const { data } = await axiosInstance.get<getProductSchema>(
      `/product?page=${page}&limit=${limit}${query ? '&q=' + query : ''}`
    )
    const validProduct = getProduct.parse(data)
    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('An unexpected error occurred while get the product.')
    }
  }
}
export async function getOneProduct(id: string) {
  try {
    const { data } = await axiosInstance.get<getProductImageSchema>(
      `/product/${id}`
    )
    const validProduct = getProductImage.parse(data)
    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('An unexpected error occurred while get the product.')
    }
  }
}
type TUpdateProduct = {
  formData: newProduct
  id: string
}
export async function updateOneProduct({ formData, id }: TUpdateProduct) {
  try {
    const { data } = await axiosInstance.put<getProductImageSchema>(
      `/product/${id}`,
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('An unexpected error occurred while update the product.')
    }
  }
}
export async function deleteOneProduct(id: string) {
  try {
    const { data } = await axiosInstance.delete(`/product/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('An unexpected error occurred while delete the product.')
    }
  }
}
