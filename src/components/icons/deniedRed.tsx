import { TSVG } from '@/types'
import { memo } from 'react'

const DeniedRed = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Layer_1"
    width={size}
    height={size}
    version="1.1"
    viewBox="0 0 512 512"
  >
    <circle cx="256" cy="256" r="256" fill="#FF6643"></circle>
    <path
      fill="#FF4F19"
      d="M256 0v512c141.385 0 256-114.615 256-256S397.385 0 256 0"
    ></path>
    <path
      fill="#F2F2F4"
      d="m365.904 184.885-38.789-38.789L256 217.211l-71.115-71.115-38.789 38.789L217.211 256l-71.115 71.115 38.789 38.789L256 294.789l71.115 71.115 38.789-38.789L294.789 256z"
    ></path>
    <path
      fill="#DFDFE1"
      d="m365.904 184.885-38.789-38.789L256 217.211v77.578l71.115 71.115 38.789-38.789L294.789 256z"
    ></path>
  </svg>
)
export const DeniedRedSVG = memo(DeniedRed)
