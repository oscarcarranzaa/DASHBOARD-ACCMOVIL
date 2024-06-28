import { Skeleton } from '@nextui-org/react'

export default function SkeletonImage() {
  return (
    <div className="max-w-80 max-h-80">
      <div className={`p-3 pl-4 pr-4  rounded-md relative  `}>
        <div
          className="rounded-md overflow-hidden relative"
          style={{ paddingTop: 'calc(100% + 4px)' }}
        >
          <div
            className="absolute h-full w-full overflow-hidden"
            style={{
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%',
            }}
          >
            <Skeleton className="w-full h-full" />
          </div>
        </div>

        <Skeleton className="w-full h-2 mt-1 rounded-md " />
      </div>
    </div>
  )
}
