import { TSVG } from '@/types'
import { memo } from 'react'

const User = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
    ></path>
  </svg>
)
const UserSVG = memo(User)
export default UserSVG
