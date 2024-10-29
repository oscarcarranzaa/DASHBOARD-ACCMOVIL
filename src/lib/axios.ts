import axios from 'axios'

export const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export default api
