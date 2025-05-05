'use client'

import { getAllUsers } from '@/api/users'
import { useQuery } from '@tanstack/react-query'

export default function useGetUsers() {
  const { data, isPending, error, isError, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers('1', '200'),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const userData = data?.data ?? []
  return { users: userData, isPending, error, isError, isFetching }
}
