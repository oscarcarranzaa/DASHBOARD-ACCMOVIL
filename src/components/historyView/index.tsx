'use client'
import { SelectProps } from "@heroui/react"
import HistoryItem from './historyItems'

type user = {
  name: string
  avatar?: string | null
  id: string
}
export type TPropsHistory = {
  id: string
  orderId: string
  type: 'STATUS' | 'MESSAGE' | 'IMAGE' | 'FILE' | 'INFO'
  image?: string | null
  message?: string | null
  status?: string | null
  file?: string | null
  info?: string | null
  date: string | null
  user?: user | null
}
export const statusColorMap: Record<string, SelectProps['color']> = {
  COMPLETADO: 'success',
  PROCESANDO: 'primary',
  CANCELADO: 'default',
  FALLIDO: 'danger',
  REEMBOLSADO: 'danger',
  PENDIENTE: 'warning',
}
type TProps = {
  history?: TPropsHistory[]
}

export default function HistortyView({ history }: TProps) {
  return (
    <>
      <div className="mt-10 mb-10 px-1">
        {history && history.length > 0
          ? history?.map((h) => {
              return (
                <div className="relative" key={h.id}>
                  <div
                    className={`h-full w-[2px] top-4  ${h.status && `bg-${statusColorMap[h.status]}`} absolute z-10`}
                  ></div>
                  <div className="w-full">
                    <HistoryItem
                      orderId={h.orderId}
                      id={h.id}
                      image={h.image}
                      status={h.status}
                      info={h.message}
                      type={h.type}
                      message={h.message}
                      date={h.date}
                      user={h.user}
                    />
                  </div>
                </div>
              )
            })
          : 'No hay registros'}
      </div>
    </>
  )
}
