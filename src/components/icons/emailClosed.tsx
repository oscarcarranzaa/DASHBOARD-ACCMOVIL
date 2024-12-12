import { TSVG } from '@/types'
import { memo } from 'react'

const emailClosed = ({ size }: TSVG) => (
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
      d="m17 16 5 5m0-5-5 5m-4-2H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 17.48 3 16.92 3 15.8V8.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C4.52 5 5.08 5 6.2 5h11.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 6.52 21 7.08 21 8.2V12m-.393-3.738-5.057 3.371c-1.283.856-1.925 1.284-2.618 1.45a4 4 0 0 1-1.864 0c-.694-.167-1.335-.594-2.618-1.45L3.147 8.1"
    ></path>
  </svg>
)
const EmailClosedSVG = memo(emailClosed)
export default EmailClosedSVG
