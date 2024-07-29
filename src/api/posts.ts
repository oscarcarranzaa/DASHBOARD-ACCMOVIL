import axiosInstance from '@/lib/axiosClient'
import { getLisPosts, getLisPostsSchema } from '@/types/posts'
import { isAxiosError } from 'axios'
export async function getLisPostsData(
  page: string,
  limit: string,
  query?: string
) {
  try {
    const { data } = await axiosInstance.get<getLisPostsSchema>(
      `/posts?page=${page}&limit=${limit}${query ? '&q=' + query : ''}`
    )
    const validProduct = getLisPosts.parse(data)
    console.log(validProduct, 'isValid')
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
