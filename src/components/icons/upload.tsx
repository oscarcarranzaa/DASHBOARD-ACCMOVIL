import { TSVG } from '@/types'

const UploadSVG = ({ size }: TSVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M8 10a4 4 0 1 1 8 0v1h1a3.5 3.5 0 1 1 0 7h-1a1 1 0 1 0 0 2h1a5.5 5.5 0 0 0 .93-10.922 6.001 6.001 0 0 0-11.86 0A5.502 5.502 0 0 0 7 20h1a1 1 0 1 0 0-2H7a3.5 3.5 0 1 1 0-7h1zm7.707 3.293-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 1 0 1.414 1.414L11 13.414V19a1 1 0 1 0 2 0v-5.586l1.293 1.293a1 1 0 0 0 1.414-1.414"
      clipRule="evenodd"
    ></path>
  </svg>
)
export default UploadSVG
