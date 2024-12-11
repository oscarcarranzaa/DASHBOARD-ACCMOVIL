import { memo } from 'react'
import { TSVG } from '@/types'

const Email = ({ size }: TSVG) => (
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
      strokeWidth="1"
      d="m4 7 6.94 4.338a2 2 0 0 0 2.12 0L20 7M5 18h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    ></path>
  </svg>
)

const EmailSVG = memo(Email)
export default EmailSVG
