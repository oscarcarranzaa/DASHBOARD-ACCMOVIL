type TProps = {
  status?: string
  color?: 'danger' | 'warning' | 'primary' | 'success'
}
export default function HistoryStatus({ status, color }: TProps) {
  const statusColor = color ? `bg-${color}` : 'bg-zinc-700 '
  return (
    <>
      <div className={` ${statusColor} rounded-lg p-2 text-white`}>
        <p className="text-center text-sm">El estado de la orden cambió a</p>
        <p className="text-2xl font-bold text-center">{status}</p>
      </div>
    </>
  )
}
