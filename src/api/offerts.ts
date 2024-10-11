import axiosInstance from '@/lib/axiosClient'
import { createCouponSchema } from '@/types/offers'
import { isAxiosError } from 'axios'

export async function createCoupon(coupon: createCouponSchema) {
  try {
    const { data } = await axiosInstance.post(
      '/admin/offerts/coupon/create',
      coupon
    )

    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al crear una orden nueva')
    }
  }
}
