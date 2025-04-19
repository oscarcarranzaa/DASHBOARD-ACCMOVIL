'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

type TProps = {
  initDate: string
  totalTimeSpent: number
}

export default function TimerStage({ initDate, totalTimeSpent }: TProps) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const totalTimeFromNow = dayjs().diff(initDate) + totalTimeSpent
      const dur = dayjs.duration(totalTimeFromNow)

      setTime({
        days: dur.days(),
        hours: dur.hours(),
        minutes: dur.minutes(),
        seconds: dur.seconds(),
      })
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
