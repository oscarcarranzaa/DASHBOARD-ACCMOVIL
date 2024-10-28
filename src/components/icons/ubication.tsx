import { TSVG } from '@/types'
import { memo } from 'react'

const Ubication = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12.816 20.608C16.85 18.55 20 15.143 20 11a8 8 0 1 0-16 0c0 4.143 3.15 7.55 7.184 9.608.513.261 1.12.261 1.632 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
    />
  </svg>
)
const UbicationSVG = memo(Ubication)
export default UbicationSVG
