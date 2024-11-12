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
        className={` bg-${status && statusColorMap[status]} rounded-lg  px-2 text-white inline-block relative`}
      >
        <div
          className={`absolute -left-3 w-5 top-2   h-[2px] bg-${status && statusColorMap[status]}`}
        ></div>
        <div
          className={`absolute w-2 h-2 -left-[15px] z-10 rounded-full top-[5px]  bg-${status && statusColorMap[status]}`}
        ></div>
        <p className="text-sm font-medium inline-block ">{status}</p>
      </div>
    </>
  )
}
