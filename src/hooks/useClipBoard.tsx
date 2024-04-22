import { useState } from 'react'

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyToClipboard = (text: string) => {
    if (!navigator.clipboard) {
      console.error('El navegador no soporta la API del portapapeles')
      return
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true)

        setTimeout(() => {
          setIsCopied(false)
        }, 3000)
      })
      .catch((error) => {
        console.error('Error al copiar al portapapeles:', error)
      })
  }

  return { isCopied, copyToClipboard }
}

export default useClipboard
