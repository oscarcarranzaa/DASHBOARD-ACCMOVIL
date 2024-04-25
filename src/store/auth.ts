'use client'

import { create } from 'zustand'

type State = {
  token: string | null
}

type Action = {
  setToken: (token: State['token']) => void
}

export const useAuthStore = create<State & Action>((set) => ({
  token: null,
  setToken: (newToken) => set(() => ({ token: newToken })),
}))
