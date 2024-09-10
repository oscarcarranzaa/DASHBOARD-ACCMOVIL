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
  removeKey: (key: string) => void
}

export const useRoleStore = create<State & Action>((set, get) => ({
  keys: [],
  name: '',
  setKeys: (newKeys) => set(() => ({ keys: newKeys })),
  addKey: (key) => set((state) => ({ keys: [...state.keys, key] })),
  removeKey: (key) =>
    set((state) => ({ keys: state.keys.filter((k) => k !== key) })),
  setName: (newName) => set(() => ({ name: newName })),
}))
