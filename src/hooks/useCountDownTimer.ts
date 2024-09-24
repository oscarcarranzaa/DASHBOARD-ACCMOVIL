import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useCallback, useEffect, useState } from 'react'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export type TTimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
} | null

export default function useCountDownTimer(date?: string | null) {
  const calcTimeLeft = useCallback(() => {
    if (!date) return null

    const now = dayjs()
    const endDate = dayjs(date)
    const isFinish = endDate.isBefore(now)

    if (isFinish) return null

    // Calcular la diferencia en milisegundos y crear una duración
    const diff = endDate.diff(now)
    const durationDate = dayjs.duration(diff)

    const days = Math.floor(durationDate.asDays())
    const hours = durationDate.hours()
    const minutes = durationDate.minutes()
    const seconds = durationDate.seconds()

    return { days, hours, minutes, seconds }
  }, [date])

  const [timeLeft, setTimeLeft] = useState<TTimeLeft>(calcTimeLeft())

  useEffect(() => {
    const updateTimer = () => {
      const time = calcTimeLeft()
      setTimeLeft(time)
    }

    // Ejecutar la primera vez
    updateTimer()
    if (calcTimeLeft() === null) return
    const intervalId = setInterval(updateTimer, 1000)

    // Limpiar el intervalo cuando el componente se desmonte o cuando no haya fecha
    return () => clearInterval(intervalId)
  }, [calcTimeLeft])

  return timeLeft
}
