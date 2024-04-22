import { TSVG } from '@/types'

const DownloadSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path strokeWidth={2} d="M12.5 4v13m0 0L7 12.21M12.5 17l5.5-4.79M6 21h13" />
  </svg>
)
export default DownloadSVG
