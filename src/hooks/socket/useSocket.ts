import { socket } from '@/lib/socket'
import { useEffect, useState } from 'react'

// hooks/useSocket.ts
export function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    // Eventos globales de conexión
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  return { isConnected, socket }
}
