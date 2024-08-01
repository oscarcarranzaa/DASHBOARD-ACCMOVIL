import axiosInstance from '@/lib/axiosClient'
import {
  getLisPosts,
  getLisPostsSchema,
  PostSchema,
  ZGetPost,
} from '@/types/posts'
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
    return validProduct
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('An unexpected error occurred while get the product.')
    }
  }
}
export async function getPost(postID: string) {
  try {
    const { data } = await axiosInstance.get<PostSchema>(
      `/posts/post/${postID}`
    )
    const validPost = ZGetPost.parse(data)

    return validPost
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('An unexpected error occurred while get the post.')
    }
  }
}
