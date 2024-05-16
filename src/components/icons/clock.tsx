import { TSVG } from '@/types'

const ClockSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M12 7v5l2.5-1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
)
export default ClockSVG
