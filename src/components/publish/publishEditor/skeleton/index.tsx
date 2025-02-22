import { CircularProgress, Skeleton } from "@heroui/react"

export default function PublishEditorSkeleton() {
  return (
    <>
      <div className="grid grid-cols-12 mt-10 gap-8 m-auto max-w-[90rem] relative">
        <div className=" col-span-7 mb-24">
          <div className="w-full h-14">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="w-full h-52 mt-10">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="w-full h-48 mt-10  grid grid-cols-6 xl:grid-cols-8 gap-2">
            <div className=" aspect-square col-span-2 row-span-2">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
            <div className=" aspect-square">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          </div>
          <div className="w-full h-96 mt-10">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="w-full h-52 mt-10">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>
        <div className=" col-span-5">
          <div className="w-full h-12 mt-10">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="w-full h-96 mt-10">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="w-full aspect-video mt-10">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>
      </div>
    </>
  )
}
