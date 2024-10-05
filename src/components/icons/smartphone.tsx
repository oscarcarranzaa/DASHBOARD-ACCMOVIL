import { memo } from 'react'
import { TSVG } from '@/types'

function SmartphoneSVG({ size }: TSVG) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
    >
      <g>
        <path d="M8 12a1 1 0 1 0 0 2h.007a1 1 0 1 0 0-2H8z" />
        <path d="M4.25 0A2.25 2.25 0 0 0 2 2.25v11.5A2.25 2.25 0 0 0 4.25 16h7.5A2.25 2.25 0 0 0 14 13.75V2.25A2.25 2.25 0 0 0 11.75 0h-7.5zM3.5 2.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V2.25z" />
      </g>
    </svg>
  )
}

export default memo(SmartphoneSVG)
