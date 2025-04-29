import styles from './style.module.css'
import { ReactNode } from 'react'

type TProps = {
  render: ReactNode
  color?: 'danger' | 'success' | 'warning' | 'primary'
}
export default function LeadStatusBar({ render, color }: TProps) {
  return (
    <div className="relative w-8">
      <div
        className={`border absolute overflow-hidden bg-white dark:bg-black z-50 ${color === 'success' && 'text-green-600   border-green-600'}  ${color === 'warning' && 'text-warning-600   border-yellow-600'}  ${color === 'primary' && 'text-blue-600   border-blue-600'} ${color === 'danger' && 'text-danger-600 border-red-600'} ${!color && 'text-green-600   border-green-600'}    w-8 h-8 flex justify-center items-center rounded-full`}
      >
        {render}
      </div>
      <div
        className={` border-l-2 border-zinc-300 dark:border-zinc-600 border-dashed ${styles.status_bar_line}`}
      ></div>
    </div>
  )
}
