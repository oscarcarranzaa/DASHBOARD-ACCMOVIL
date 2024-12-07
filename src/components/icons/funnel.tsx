import { TSVG } from '@/types'
import { memo } from 'react'

const funnel = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Flat"
    width={size}
    height={size}
    viewBox="0 0 256 256"
  >
    <path d="M204 128a12 12 0 0 1-12 12H64a12 12 0 0 1 0-24h128a12 12 0 0 1 12 12m28-60H24a12 12 0 0 0 0 24h208a12 12 0 0 0 0-24m-80 96h-48a12 12 0 0 0 0 24h48a12 12 0 0 0 0-24"></path>
  </svg>
)
const FunnnelSVG = memo(funnel)
export default FunnnelSVG
