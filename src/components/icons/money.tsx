import { memo } from 'react'
import { TSVG } from '@/types'

function MoneySVG({ size }: TSVG) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M5.823 6A2 2 0 1 1 3 8.823M5.823 6h12.354M5.823 6c-.874.003-1.354.026-1.731.218a2 2 0 0 0-.874.874c-.192.377-.215.857-.218 1.731m0 0v6.354m0 0A2 2 0 1 1 5.823 18M3 15.177c.003.875.026 1.354.218 1.731a2 2 0 0 0 .874.874c.377.192.857.215 1.731.218m0 0h12.354M21 15.177A2 2 0 1 0 18.177 18M21 15.177V8.823m0 6.354c-.003.875-.026 1.354-.218 1.731a2 2 0 0 1-.874.874c-.377.192-.857.215-1.731.218M21 8.823A2 2 0 1 1 18.177 6M21 8.823c-.003-.874-.026-1.354-.218-1.731a2 2 0 0 0-.874-.874c-.377-.192-.857-.215-1.731-.218M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
    </svg>
  )
}

export default memo(MoneySVG)