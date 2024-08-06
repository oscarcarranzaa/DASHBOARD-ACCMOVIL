import { TSVG } from '@/types'
import { memo } from 'react'

const CollapseArrowRight = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path strokeWidth={2} d="M4 4v16m4-8h12m0 0-4-4m4 4-4 4" />
  </svg>
)
const CollapseArrowRightSVG = memo(CollapseArrowRight)
export default CollapseArrowRightSVG
