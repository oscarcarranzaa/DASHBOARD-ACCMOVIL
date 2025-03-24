import { TSVG } from '@/types'
import { memo } from 'react'

const Pipeline = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    transform="scale(1 -1)"
    viewBox="0 0 512 512"
    width={size}
    height={size}
  >
    <g>
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="40"
        stroke="currentColor"
        d="M32 160v296a8 8 0 0 0 8 8h136V160a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16M320 48H192a16 16 0 0 0-16 16v400h160V64a16 16 0 0 0-16-16M464 208H352a16 16 0 0 0-16 16v240h136a8 8 0 0 0 8-8V224a16 16 0 0 0-16-16"
      ></path>
    </g>
  </svg>
)
const PipelineSVG = memo(Pipeline)
export default PipelineSVG
