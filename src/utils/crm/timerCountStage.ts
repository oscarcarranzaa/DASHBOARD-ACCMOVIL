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
const timerCount = (init: string | undefined, total: number | undefined) => {
  const now = dayjs()
  const totalSeconds = Math.max(
    0,
    now.diff(dayjs(init), 'seconds') + (total ?? 0)
  )

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

export default function timerCountStage({
  initDate,
  totalTimeSpent,
  interval = 1000,
}: TProps) {
  const [time, setTime] = useState<TCountTimer>(
    timerCount(initDate, totalTimeSpent)
  )
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setTime(timerCount(initDate, totalTimeSpent))
    }, interval)

    return () => clearInterval(intervalTimer)
  }, [initDate, totalTimeSpent])
  return time
}
