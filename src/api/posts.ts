import axiosInstance from '@/lib/axiosClient'
import {
  getLisPosts,
  getLisPostsSchema,
  IdSchema,
  PostSchema,
  SaveNewPostSchema,
  SavePostSchema,
  ZGetID,
  ZGetPost,
  ZSaveGetPost,
} from '@/types/posts'
import { isAxiosError } from 'axios'

export async function getLisPostsData(
  page: string,
  limit: string,
  query?: string,
  status?: string
) {
  try {
    const { data } = await axiosInstance.get<getLisPostsSchema>(
      `/posts?page=${page}&limit=${limit}${query ? '&q=' + query : ''}${status ? '&status=' + status : ''}`
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
type TUpdateSchema = {
  postID: string
  formData: SavePostSchema
}
export async function createPost(formData: SavePostSchema) {
  try {
    const { data } = await axiosInstance.post<SaveNewPostSchema>(
      `/posts/new`,
      formData
    )
    const validate = ZSaveGetPost.parse(data)
    return validate
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error(
        'An unexpected error occurred while get the post.' + error
      )
    }
  }
}
export async function duplicatePost(id: string) {
  try {
    const { data } = await axiosInstance.post<IdSchema>(`/posts/duplicated`, {
      id,
    })
    const validate = ZGetID.parse(data)
    return validate
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error(
        'An unexpected error occurred while get the post.' + error
      )
    }
  }
}

export async function updatePost({ postID, formData }: TUpdateSchema) {
  try {
    const { data } = await axiosInstance.put(`/posts/post/${postID}`, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('An unexpected error occurred while get the post.')
    }
  }
}
