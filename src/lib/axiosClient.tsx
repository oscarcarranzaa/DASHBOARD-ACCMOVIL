import axios from 'axios'
import { BASE_URL } from './axios'
import { getAuthToken } from './getAuthToken'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(async (req) => {
  const token = await getAuthToken()
  req.headers.Authorization = `Bearer ${token}`
  return req
})

export default axiosInstance
