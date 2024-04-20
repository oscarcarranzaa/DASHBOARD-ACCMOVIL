import { TSVG } from '@/types'

const MediaImageSVG = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 28 28"
  >
    <path d="M10 5.15a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7zM7.85 9a2.15 2.15 0 1 1 4.3 0 2.15 2.15 0 0 1-4.3 0z" />
    <path d="M4 1h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zM3 24v-.41L19.036 13.4a1 1 0 0 1 1.19.088L25 17.624V24a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm17.864-12.6L25 14.984V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v17.222l15.555-9.886a2 2 0 0 1 2.31.064z" />
  </svg>
)
export default MediaImageSVG
