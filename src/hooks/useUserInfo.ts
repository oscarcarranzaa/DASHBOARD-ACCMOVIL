'use client'
import { userData } from '@/api/userData'
import { useAuthStore } from '@/store/auth'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function useUserInfo() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['user'],
    queryFn: userData,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  const setUserInfo = useAuthStore((state) => state.setUser)
  useEffect(() => {
    if (data) {
      setUserInfo(data)
    }
  }, [data])

  return { userData: data, userPending: isPending, userError: isError }
}
