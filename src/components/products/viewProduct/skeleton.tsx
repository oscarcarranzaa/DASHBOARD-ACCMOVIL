import { Card, Skeleton } from '@nextui-org/react'

export default function ViewProductSkeleton() {
  return (
    <>
      <div className="lg:flex mt-5">
        <div className="md:min-w-[200px] lg:min-w-[250px] xl:min-w-[380px]  mr-8">
          <div
            className=" rounded-md  overflow-hidden relative bg-zinc-200 dark:bg-zinc-800"
            style={{ paddingTop: '100%' }}
          >
            <Skeleton
              className=" absolute h-full w-full overflow-hidden flex items-center justify-center"
              style={{
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
              }}
            ></Skeleton>
          </div>
        </div>
        <div className="w-full">
          <Skeleton className="max-w-[600px] min-w-[300px] h-6 rounded-lg"></Skeleton>
          <div className="md:flex justify-between max-w-[700px] min-w-[450px] mt-7 h-24 ">
            <div>
              <Skeleton className="h-5 w-[214px] rounded-md "></Skeleton>
              <div className="mt-4">
                <Skeleton className="h-4 mt-1 w-[180px] rounded-md"></Skeleton>
                <Skeleton className="h-4 mt-2 w-[230px] rounded-md"></Skeleton>
                <Skeleton className="h-4 mt-2 w-[250px] rounded-md"></Skeleton>
                <Skeleton className="h-4 mt-2 w-[200px] rounded-md"></Skeleton>
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-[214px] rounded-md"></Skeleton>
              <div className="mt-4">
                <Skeleton className="h-4 mt-2 w-[180px] rounded-md"></Skeleton>
                <Skeleton className="h-4 mt-2 w-[230px] rounded-md"></Skeleton>
                <Skeleton className="h-4 mt-2 w-[220px] rounded-md"></Skeleton>
                <Skeleton className="h-4 mt-2 w-[200px] rounded-md"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
