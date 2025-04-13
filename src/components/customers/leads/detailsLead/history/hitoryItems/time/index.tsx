import dayjs from 'dayjs'

type TProps = {
  source?: string
  date: string
  name?: string | null
}
export default function HistoryTime({ date, source, name }: TProps) {
  return (
    <div className="text-xs flex gap-1 opacity-70">
      <p>{dayjs(date).format('MMM DD hh:mm A YYYY')}</p>
      <span>•</span>
      <p>{name}</p>
      <span>•</span>
      <p>({source})</p>
    </div>
  )
}
