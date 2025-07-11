import axiosInstance from '@/lib/axiosClient'
import { isAxiosError } from 'axios'
import {
  AllResumeLeadsMetricsSchema,
  LeadsMetricsResponseSchema,
  ZAllResumeLeadsMetrics,
  ZLeadsMetricsResponse,
} from '@/types/crm/analitycs'

export type TParamsMetrics = {
  from?: string | null
  to?: string | null
  userId?: string | null
  funnelId?: string | null
}
export async function getLeadsMetrics({
  from,
  to,
  userId,
  funnelId,
}: TParamsMetrics) {
  try {
    const paramsUrl = new URLSearchParams()
    const entries = { from, to, userId, funnelId }
    for (const key in entries) {
      const value = entries[key as keyof typeof entries]
      if (value) {
        paramsUrl.set(key, value)
      }
    }

    const { data } = await axiosInstance.get<LeadsMetricsResponseSchema>(
      `/admin/lead/analitycs/metrics?${paramsUrl.toString()}`
    )
    const parseData = ZLeadsMetricsResponse.parse(data)
    return parseData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('An unexpected error occurred while get leads metrics.')
    }
  }
}
export async function getResumeLeadsMetrics({
  from,
  to,
  userId,
  funnelId,
}: TParamsMetrics) {
  try {
    const paramsUrl = new URLSearchParams()
    const entries = { from, to, userId, funnelId }
    for (const key in entries) {
      const value = entries[key as keyof typeof entries]
      if (value) {
        paramsUrl.set(key, value)
      }
    }

    const { data } = await axiosInstance.get<AllResumeLeadsMetricsSchema>(
      `/admin/lead/analitycs/rates?${paramsUrl.toString()}`
    )
    const parseData = ZAllResumeLeadsMetrics.parse(data)
    return parseData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('An unexpected error occurred while get leads metrics.')
    }
  }
}
