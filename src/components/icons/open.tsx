import { TSVG } from '@/types'

const OpenSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path
      strokeWidth={2}
      d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2 8-8m0 0v5m0-5h-5"
    />
  </svg>
)
export default OpenSVG
