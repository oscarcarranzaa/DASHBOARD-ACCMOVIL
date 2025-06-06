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
  const timerCount = () => {
    const now = dayjs()
    const totalSeconds = now.diff(dayjs(initDate), 'seconds') + totalTimeSpent
    const dur = dayjs.duration(totalSeconds, 'seconds')

    return {
      days: Math.floor(dur.asDays()),
      hours: dur.hours(),
      minutes: dur.minutes(),
      seconds: dur.seconds(),
    }
  }

  const [time, setTime] = useState<TCountTimer>(timerCount)

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
