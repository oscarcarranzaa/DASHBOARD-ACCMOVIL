import { RefObject, useEffect } from 'react'

const useOutsideClick = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      callback()
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, callback])
}

export default useOutsideClick
