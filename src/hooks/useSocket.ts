import { socket } from '@/lib/socket'
import { useEffect } from 'react'

// hooks/useSocket.ts
export const useSocket = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado con ID:', socket.id)
    })

    socket.on('mensaje:respuesta', (data) => {
      console.log('Respuesta del servidor:', data)
    })

    return () => {
      socket.off('mensaje:respuesta')
    }
  }, [])
}
