import { filterQueryType } from '@/types'

export const FilterQueryUrl = ({
  page,
  q,
  limit,
  endDate,
  startDate,
}: filterQueryType) => {
  let filterUrl = `?page=${page}`
  if (limit) filterUrl += `&limit=${limit}`
  if (q) filterUrl += `&q=${q}`
  if (startDate) filterUrl += `&startDate=${startDate}`
  if (endDate) filterUrl += `&endDate=${endDate}`

  return { filterUrl }
}
