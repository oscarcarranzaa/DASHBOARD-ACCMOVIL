import { TSVG } from '@/types'

const ProductSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path
      fill="#000"
      d="M20.73 16.52V7.59a.73.73 0 0 0-.08-.33.74.74 0 0 0-.36-.36l-8-3.58a.75.75 0 0 0-.62 0l-8 3.58a.8.8 0 0 0-.44.69v8.82a.83.83 0 0 0 .44.69l8 3.58a.72.72 0 0 0 .62 0l8-3.58a.77.77 0 0 0 .44-.58zm-16-7.78 6.5 2.92v7.18l-6.5-2.91V8.74zm8 2.92 6.5-2.92v7.19l-6.5 2.91v-7.18zM12 4.82l6.17 2.77L12 10.35 5.83 7.59 12 4.82z"
    />
  </svg>
)
export default ProductSVG
