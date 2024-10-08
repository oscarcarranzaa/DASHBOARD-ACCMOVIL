'use client'
import { userData } from '@/api/userData'
import { useQuery } from '@tanstack/react-query'

export default function useUserInfo() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['user'],
    queryFn: userData,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  return { userData: data, userPending: isPending, userError: isError }
}
