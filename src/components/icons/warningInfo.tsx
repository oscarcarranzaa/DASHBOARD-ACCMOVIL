import { TSVG } from '@/types'

const WarningInfo = ({ size }: TSVG) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path strokeWidth={2} d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM12 8v4.5" />
    <path d="M13 15.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
)
export default WarningInfo
