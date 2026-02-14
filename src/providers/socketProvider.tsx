// Provider para manejar el socket en toda la aplicacion
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSocket } from '@/hooks/socket'

const SocketContext = createContext<{ isConnected: boolean }>({
  isConnected: false,
})

export function SocketProvider({ children }: { children: ReactNode }) {
  const { isConnected } = useSocket()

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext)
