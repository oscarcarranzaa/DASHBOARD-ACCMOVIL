import { TSVG } from '@/types'
import { memo } from 'react'

const CustomerProfile = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 1024 1024"
  >
    <circle cx={512} cy={512} r={512} fill="#5271ff" />
    <path
      fill="#fff"
      d="M599.2 502.8c61.5-48.4 72.1-137.4 23.7-198.9S485.5 231.8 424 280.2 352 417.5 400.3 479c6.9 8.8 14.9 16.8 23.7 23.7-80.8 32.4-137.2 106.6-146.8 193.1-1.4 13 8 24.8 21 26.2 13 1.4 24.8-8 26.2-21C336 597.4 429.5 522.8 533.1 534.4c87.6 9.8 156.7 79 166.6 166.6 1.3 12 11.5 21.1 23.6 21h2.6c12.9-1.5 22.2-13.1 20.8-26-9.6-86.7-66.3-161-147.5-193.2zM511.6 486c-52.1 0-94.4-42.3-94.4-94.4s42.3-94.4 94.4-94.4 94.4 42.3 94.4 94.4-42.2 94.4-94.4 94.4z"
    />
  </svg>
)
export const CustomerProfileSVG = memo(CustomerProfile)
