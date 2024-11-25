import { TSVG } from '@/types'

const OffSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path strokeWidth={2} d="M12 3v9m6.361-6.36a9 9 0 1 1-12.73 0" />
  </svg>
)
export default OffSVG
