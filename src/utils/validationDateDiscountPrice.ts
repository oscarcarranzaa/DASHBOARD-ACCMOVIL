import dayjs from 'dayjs'

export default function validDiscountPrice(
  startDate?: string | null,
  endDate?: string | null
) {
  const currentDate = dayjs().toISOString()
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  const isInit = start.isBefore(currentDate)
  const isNotFinish = end.isAfter(currentDate)
  const isTimeDiscount = !startDate && !endDate
  const validTimeDiscount = isInit && isNotFinish
  const validDiscount = isTimeDiscount || validTimeDiscount

  return { isInit, isNotFinish, validDiscount }
}
