import { TSVG } from '@/types'
import { memo } from 'react'

const Lock = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    stroke="none"
  >
    <path d="M25 12h-1V8.184C24 3.595 20.68 0 15.963 0 11.227 0 8 3.671 8 8.184V12H7c-2.206 0-4 1.794-4 4v12c0 2.206 1.794 4 4 4h18c2.206 0 4-1.794 4-4V16c0-2.206-1.794-4-4-4M10 8.184C10 4.775 12.33 2 15.963 2 19.559 2 22 4.716 22 8.184V12H10zM27 28c0 1.102-.898 2-2 2H7c-1.103 0-2-.898-2-2V16c0-1.102.897-2 2-2h18c1.102 0 2 .898 2 2zM16 18a1.994 1.994 0 0 0-1 3.723V25a1 1 0 0 0 2 0v-3.277c.595-.346 1-.985 1-1.723a2 2 0 0 0-2-2"></path>
  </svg>
)
const LockSVG = memo(Lock)
export default LockSVG
