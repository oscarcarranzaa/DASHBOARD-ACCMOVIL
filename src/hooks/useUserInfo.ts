'use client'
import { userData } from '@/api/userData'
import { useAuthStore } from '@/store/auth'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function useUserInfo() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: userData,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  const { setUser, setIsLoading, setError } = useAuthStore((state) => state)

  useEffect(() => {
    if (data) {
      setUser(data)
    }
    setIsLoading(isPending)
    if (isError) {
      setError(error?.message)
    } else {
      setError(null)
    }
  }, [data, error, isError, isPending, setError, setIsLoading, setUser])

  return { userData: data, userPending: isPending, userError: isError, refetch }
}
