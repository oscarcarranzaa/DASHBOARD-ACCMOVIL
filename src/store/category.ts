'use client'
import { create } from 'zustand'

type State = {
  openCategory: string
}
type Action = {
  setOpenCategory: (category: State['openCategory']) => void
}

export const useCategoryStore = create<State & Action>((set) => ({
  openCategory: '',
  setOpenCategory: (category) => set(() => ({ openCategory: category })),
}))
