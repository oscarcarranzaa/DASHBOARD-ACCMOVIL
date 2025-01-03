import { TSVG } from '@/types'
import { memo } from 'react'

const SuccessCheck = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 12"
  >
    <path d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12zm2.576-7.02a.75.75 0 0 0-1.152-.96L5.45 6.389l-.92-.92A.75.75 0 0 0 3.47 6.53l1.5 1.5a.75.75 0 0 0 1.106-.05l2.5-3z" />
  </svg>
)
export const SuccessCheckSVG = memo(SuccessCheck)
