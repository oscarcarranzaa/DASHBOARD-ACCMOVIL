'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

type TProps = {
  initDate?: string
  totalTimeSpent?: number
  interval?: number
}

type TCountTimer = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Función pura para calcular el tiempo
const getTimerCount = (initDate?: string, totalTimeSpent?: number) => {
  const now = dayjs()
  const totalSeconds = Math.max(
    0,
    now.diff(dayjs(initDate), 'seconds') + (totalTimeSpent ?? 0)
  )

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

export function useTimerCountStage({
  initDate,
  totalTimeSpent,
  interval = 1000,
}: TProps) {
  const [time, setTime] = useState<TCountTimer>(
    getTimerCount(initDate, totalTimeSpent)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimerCount(initDate, totalTimeSpent))
    }, interval)

    return () => clearInterval(timer)
  }, [initDate, totalTimeSpent, interval])

  return time
}
