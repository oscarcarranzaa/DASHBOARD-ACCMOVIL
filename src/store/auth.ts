'use client'
import { UserOwnerSchema } from '@/types/users'
import { create } from 'zustand'

type State = {
  token: string | null
  user: UserOwnerSchema | null
  error: string | null
  isLoading: boolean
}
type Action = {
  setToken: (token: State['token']) => void
  setUser: (user: State['user']) => void
  logoutUserToken: () => void
  setError: (error: State['error']) => void
  setIsLoading: (isLoading: State['isLoading']) => void
}

export const useAuthStore = create<State & Action>((set) => ({
  token: null,
  error: null,
  isLoading: true,
  user: null,
  setToken: (newToken) => set(() => ({ token: newToken })),
  setUser: (newUser) => set(() => ({ user: newUser })),
  logoutUserToken: () => set(() => ({ token: null, user: null })),
  setError: (newError) => set(() => ({ error: newError })),
  setIsLoading: (newLoading) => set(() => ({ isLoading: newLoading })),
}))
