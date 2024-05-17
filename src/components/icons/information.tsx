import { TSVG } from '@/types'

const InformationSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <g data-name="Layer 2">
      <path fill="none" d="M0 0h48v48H0z" data-name="invisible box" />
      <g data-name="icons Q2">
        <path d="M24 2a22 22 0 1 0 22 22A21.9 21.9 0 0 0 24 2zm0 40a18 18 0 1 1 18-18 18.1 18.1 0 0 1-18 18z" />
        <path d="M24 20a2 2 0 0 0-2 2v12a2 2 0 0 0 4 0V22a2 2 0 0 0-2-2z" />
        <circle cx={24} cy={14} r={2} />
      </g>
    </g>
  </svg>
)
export default InformationSVG
