import { TSVG } from '@/types'
import { memo } from 'react'

const SendMessage = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
  >
    <g>
      <path fill="none" d="M0 0h48v48H0z"></path>
      <path d="m44.9 23.2-38-18L6 5a2 2 0 0 0-2 2l5.3 16H24a2.1 2.1 0 0 1 2 2 2 2 0 0 1-2 2H9.3L4 43a2 2 0 0 0 2 2l.9-.2 38-18a2 2 0 0 0 0-3.6"></path>
    </g>
  </svg>
)
const SendMessageSVG = memo(SendMessage)
export default SendMessageSVG
