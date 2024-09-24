import axiosInstance from '@/lib/axiosClient'
import {
  getProductsSchema,
  newProductSchema,
  productSchema,
  ZGetProducts,
  ZProduct,
} from '@/types/products'
import {
  media,
  MediaSchema,
  resposeIdSchema,
  ZResponseId,
} from '@/types/schemas'
import { isAxiosError } from 'axios'

export async function createProduct(formData: newProductSchema) {
  try {
    const { data } = await axiosInstance.post<resposeIdSchema>(
      '/product',
      formData
    )
    const validProduct = ZResponseId.parse(data)
    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
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
    const { data } = await axiosInstance.get<getProductsSchema>(
      `/product?page=${page}&limit=${limit}${query ? '&q=' + query : ''}`
    )
    const validProduct = ZGetProducts.parse(data)
    return validProduct
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('An unexpected error occurred while get the product.')
    }
  }
}
export async function getOneProduct(id: string) {
  try {
    const { data } = await axiosInstance.get<productSchema>(`/product/${id}`)
    const validProduct = ZProduct.parse(data)
    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data, { cause: error.response.status })
    } else {
      throw new Error('An unexpected error occurred while get the product.')
    }
  }
}
type TUpdateProduct = {
  formData: newProductSchema
  id: string
}
export async function updateOneProduct({ formData, id }: TUpdateProduct) {
  try {
    const { data } = await axiosInstance.put<productSchema>(
      `/product/${id}`,
      formData
    )
    const validProduct = ZProduct.parse(data)
    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error('Error al actualizar el producto')
    }
  }
}
type TUpdateProductImage = {
  image: string
  id: string
}
export async function updateOneProductImage({
  image,
  id,
}: TUpdateProductImage) {
  try {
    const { data } = await axiosInstance.put<MediaSchema>(
      `/product/${id}/image`,
      {
        imageID: image,
      }
    )
    const validate = media.parse(data)
    return validate
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
