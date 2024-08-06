import { TSVG } from '@/types'
import { memo } from 'react'

const CollapseArrowLeft = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path strokeWidth={2} d="M4 4v16m4-8h12M8 12l4-4m-4 4 4 4" />
  </svg>
)
const CollapseArrowLeftSVG = memo(CollapseArrowLeft)
export default CollapseArrowLeftSVG
