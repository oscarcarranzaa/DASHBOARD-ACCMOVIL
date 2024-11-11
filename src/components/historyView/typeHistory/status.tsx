import { SelectProps } from '@nextui-org/react'

type TProps = {
  status?: string | null
}
export const statusColorMap: Record<string, SelectProps['color']> = {
  COMPLETADO: 'success',
  PROCESANDO: 'primary',
  CANCELADO: 'default',
  FALLIDO: 'danger',
  REEMBOLSADO: 'danger',
  PENDIENTE: 'warning',
}
export default function HistoryStatus({ status }: TProps) {
  return (
    <>
      <div
        className={` bg-${status && statusColorMap[status]} rounded-lg  px-2 text-white inline-block`}
      >
        <p className="text-sm font-medium inline-block ">{status}</p>
      </div>
    </>
  )
}
