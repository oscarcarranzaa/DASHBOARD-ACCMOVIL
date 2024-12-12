import { TSVG } from '@/types'
import { memo } from 'react'

const bellDisabled = ({ size }: TSVG) => (
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
      d="m3 3 18 18M9.377 3.563A6.36 6.36 0 0 1 12 3c1.591 0 3.117.59 4.243 1.64C17.368 5.69 18 7.115 18 8.6c0 1.757.29 3.176.712 4.312M17 17h-2M6.453 6.465A5.3 5.3 0 0 0 6 8.6c0 2.686-.676 4.584-1.473 5.887-.77 1.262-1.156 1.893-1.142 2.057.016.184.052.248.201.358.132.098.762.098 2.02.098H9m0 0v1a3 3 0 1 0 6 0v-1m-6 0h6"
    ></path>
  </svg>
)
const BellDisabledSVG = memo(bellDisabled)
export default BellDisabledSVG
