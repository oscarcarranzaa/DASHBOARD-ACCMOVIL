'use client'

import { create } from 'zustand'

interface AuthStore {
  token: string | null
  setToken: (token: string | null) => void
  updateToken: (updateToken: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  updateToken: (updatedToken) => set({ token: updatedToken }),
}))
