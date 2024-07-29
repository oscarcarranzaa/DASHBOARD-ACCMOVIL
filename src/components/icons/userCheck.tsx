import { TSVG } from '@/types'
import { memo } from 'react'

const UserCheck = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth={2}
      d="M14 19.286 15.8 21l4.2-4M4 21a7 7 0 0 1 11-5.745M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
    />
  </svg>
)
const UserCheckSVG = memo(UserCheck)
export default UserCheckSVG
