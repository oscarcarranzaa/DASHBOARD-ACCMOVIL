'use client'
import { create } from 'zustand'

type State = {
  keys: string[]
  name: string
}

type Action = {
  setKeys: (keys: State['keys']) => void
  setName: (name: State['name']) => void
  addKey: (key: string) => void
  removeKeys: (keysToRemove: string[]) => void
  removeKey: (key: string) => void
}

export const useRoleStore = create<State & Action>((set, get) => ({
  keys: [],
  name: '',
  setKeys: (newKeys) => {
    const uniqueKeys = Array.from(new Set(newKeys))
    set({ keys: uniqueKeys })
  },
  addKey: (key) => {
    const { keys } = get()
    if (!keys.includes(key)) {
      set({ keys: [...keys, key] })
    }
  },
  removeKeys: (keysToRemove) =>
    set((state) => ({
      keys: state.keys.filter((k) => !keysToRemove.includes(k)),
    })),
  removeKey: (key) =>
    set((state) => ({ keys: state.keys.filter((k) => k !== key) })),
  setName: (newName) => set(() => ({ name: newName })),
}))
