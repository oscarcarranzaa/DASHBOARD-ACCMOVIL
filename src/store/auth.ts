'use client'
import { UserSchema } from '@/types/schemas'
import { create } from 'zustand'

type State = {
  token: string | null
  user: UserSchema | null
}
type Action = {
  setToken: (token: State['token']) => void
  setUser: (user: State['user']) => void
  logoutUserToken: () => void
}

export const useAuthStore = create<State & Action>((set) => ({
  token: null,
  user: null,
  setToken: (newToken) => set(() => ({ token: newToken })),
  setUser: (newUser) => set(() => ({ user: newUser })),
  logoutUserToken: () => set(() => ({ token: null, user: null })),
}))
