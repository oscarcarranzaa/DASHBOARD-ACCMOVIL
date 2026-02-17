import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export function useGlobalNow(interval = 1000) {
  const [now, setNow] = useState(() => dayjs())

  useEffect(() => {
    const id = setInterval(() => {
      setNow(dayjs())
    }, interval)

    return () => clearInterval(id)
  }, [interval])

  return now
}
