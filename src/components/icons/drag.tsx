import { TSVG } from '@/types'

const DragSVG = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path d="M10 4a2 2 0 1 1-2-2 2 2 0 0 1 2 2m-2 6a2 2 0 1 0 2 2 2 2 0 0 0-2-2m0 8a2 2 0 1 0 2 2 2 2 0 0 0-2-2m8-12a2 2 0 1 0-2-2 2 2 0 0 0 2 2m0 8a2 2 0 1 0-2-2 2 2 0 0 0 2 2m0 8a2 2 0 1 0-2-2 2 2 0 0 0 2 2"></path>
  </svg>
)
export default DragSVG
