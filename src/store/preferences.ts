'use client'
import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Define la interfaz del estado
interface SideBarState {
  startMenu: boolean
  toggleStartMenu: () => void
}

// Define el creador de estado con el tipo correcto para persistencia
const createSideBarStore: StateCreator<
  SideBarState,
  [['zustand/persist', unknown]],
  [],
  SideBarState
> = (set) => ({
  startMenu: false,
  toggleStartMenu: () => set((state) => ({ startMenu: !state.startMenu })),
})

// tienda Zustand con persistencia
export const useSideBar = create<SideBarState>()(
  persist(createSideBarStore, {
    name: 'sidebar', // Nombre clave en el almacenamiento
    storage: createJSONStorage(() => localStorage), // Utilizando localStorage
  })
)
