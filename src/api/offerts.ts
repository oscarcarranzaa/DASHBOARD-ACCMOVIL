import axiosInstance from '@/lib/axiosClient'
import { filterQueryType } from '@/types'
import {
  couponSchema,
  createCouponSchema,
  listCouponSchema,
  ZCoupon,
  ZGetListCoupon,
} from '@/types/offers'
import { FilterQueryUrl } from '@/utils/filterQueryUrl'
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
      throw new Error('Error al crear un cupon nuevo.')
    }
  }
}

export async function getAllCoupons({
  page,
  limit,
  q,
  startDate,
  endDate,
}: filterQueryType) {
  try {
    const { filterUrl } = FilterQueryUrl({ page, limit, q, startDate, endDate })
    const { data } = await axiosInstance.get<listCouponSchema>(
      `/admin/offerts/coupon${filterUrl}`
    )
    const validCouponst = ZGetListCoupon.parse(data)
    return validCouponst
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al obtener los cupones.')
    }
  }
}

export async function handleStateCoupon({
  id,
  status,
}: {
  id: string
  status: boolean
}) {
  try {
    const { data } = await axiosInstance.put<couponSchema>(
      `/admin/offerts/coupon/status/${id}`,
      {
        status,
      }
    )
    const validCoupon = ZCoupon.parse(data)
    return validCoupon
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al cambiar el estado del cupon.')
    }
  }
}

export async function checkCouponCode({ code }: { code: string }) {
  try {
    const { data } = await axiosInstance.get<couponSchema>(
      `/admin/offerts/coupon/check/${code}`
    )
    const validCoupon = ZCoupon.parse(data)
    return validCoupon
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al cambiar el estado del cupon.')
    }
  }
}
