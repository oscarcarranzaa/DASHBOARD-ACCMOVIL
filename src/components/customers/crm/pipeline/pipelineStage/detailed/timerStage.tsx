/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

type TProps = {
  initDate: string
  totalTimeSpent: number
  isPending?: boolean
}
type TCountTimer = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function TimerStage({
  initDate,
  totalTimeSpent,
  isPending,
}: TProps) {
  const [time, setTime] = useState<TCountTimer>(timerCount())
  console.log(initDate, totalTimeSpent, isPending)
  function timerCount() {
    const now = dayjs()
    const totalMillis = now.diff(dayjs(initDate)) + totalTimeSpent
    const dur = dayjs.duration(totalMillis)

    const days = Math.floor(dur.asDays())
    const hours = dur.hours()
    const minutes = dur.minutes()
    const seconds = dur.seconds()
    return { days, hours, minutes, seconds }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timerCount())
    }, 1000)

    return () => clearInterval(interval)
  }, [initDate, totalTimeSpent])

  return (
    <div>
      {time.days > 0 && <span>{time.days}d </span>}
      <span>{String(time.hours).padStart(2, '0')}:</span>
      <span>{String(time.minutes).padStart(2, '0')}:</span>
      <span>{String(time.seconds).padStart(2, '0')}</span>
    </div>
  )
}
