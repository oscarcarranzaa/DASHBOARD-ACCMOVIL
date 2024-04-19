import { TSVG } from '@/types'

const WorldSVG = ({ size }: TSVG) => (
  <svg width={size} height={size} viewBox="0 0 512 512">
    <path d="M256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm-83.789 41.609c-24.934 27.119-44.68 66.125-56.755 111.992H49.749c25.43-50.86 69.12-91.077 122.462-111.992zM25.6 256c0-26.999 5.077-52.727 13.662-76.8h70.494c-4.608 24.294-7.356 49.963-7.356 76.8s2.748 52.506 7.347 76.8H39.262C30.677 308.727 25.6 283 25.6 256zm24.149 102.4h65.707c12.083 45.867 31.821 84.872 56.755 111.991-53.342-20.915-97.032-61.132-122.462-111.991zM243.2 485.188c-43.81-8.252-81.877-58.24-101.359-126.788H243.2v126.788zm0-152.388H135.74c-4.924-24.166-7.74-49.997-7.74-76.8s2.816-52.634 7.74-76.8H243.2v153.6zm0-179.2H141.841C161.323 85.052 199.39 35.063 243.2 26.812V153.6zm219.051 0h-65.707c-12.083-45.867-31.821-84.873-56.755-111.992 53.342 20.916 97.032 61.133 122.462 111.992zM268.8 26.812c43.81 8.252 81.877 58.24 101.359 126.788H268.8V26.812zm0 152.388h107.46c4.924 24.166 7.74 49.997 7.74 76.8s-2.816 52.634-7.74 76.8H268.8V179.2zm0 305.988V358.4h101.359C350.677 426.948 312.61 476.937 268.8 485.188zm70.989-14.797c24.934-27.127 44.672-66.125 56.755-111.991h65.707c-25.43 50.859-69.12 91.076-122.462 111.991zM402.244 332.8c4.608-24.294 7.356-49.963 7.356-76.8s-2.748-52.506-7.347-76.8h70.494c8.576 24.073 13.653 49.801 13.653 76.8 0 27-5.077 52.727-13.662 76.8h-70.494z" />
  </svg>
)
export default WorldSVG