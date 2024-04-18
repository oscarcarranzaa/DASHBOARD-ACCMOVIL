import { TSVG } from '@/types'

const ArrowAngleSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      fill={'#000'}
      d="M12 14.5a.74.74 0 0 1-.53-.22L8 10.78a.75.75 0 0 1 1-1.06l3 3 3-3a.75.75 0 0 1 1 1.06l-3.5 3.5a.74.74 0 0 1-.5.22z"
    />
  </svg>
)
export default ArrowAngleSVG
