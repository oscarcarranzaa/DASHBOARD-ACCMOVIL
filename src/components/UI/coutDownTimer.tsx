import { TTimeLeft } from '@/hooks/useCountDownTimer'
import CountDownNumber from './countDownNumber'
type TProps = {
  date: TTimeLeft
}
export default function CountDownTimer({ date }: TProps) {
  if (!date) return null

  return (
    <>
      <div className="flex gap-1 items-center">
        <CountDownNumber number={date?.days} type="days" label="Días" />
        <span className=" text-3xl -translate-y-3 font-semibold text-zinc-400">
          :
        </span>
        <CountDownNumber number={date?.hours} type="hours" label="Horas" />
        <span className=" text-3xl -translate-y-3 font-semibold text-zinc-400">
          :
        </span>
        <CountDownNumber
          number={date?.minutes}
          type="minutes"
          label="Minutos"
        />
        <span className=" text-3xl -translate-y-3 font-semibold text-zinc-400">
          :
        </span>
        <CountDownNumber
          number={date?.seconds}
          type="seconds"
          label="Segundos"
        />
      </div>
    </>
  )
}
