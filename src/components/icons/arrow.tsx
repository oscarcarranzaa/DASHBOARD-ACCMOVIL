import { TSVG } from '@/types'

const ArrowSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path strokeWidth={2} d="M6 12h12M6 12l5-5m-5 5 5 5" />
  </svg>
)
export default ArrowSVG
