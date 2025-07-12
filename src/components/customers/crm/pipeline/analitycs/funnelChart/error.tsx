import { CloudAlert } from 'lucide-react'

export default function FunnelChartError({ message }: { message: string }) {
  return (
    <>
      <div className="flex flex-col h-[200px] text-red-500 items-center justify-center mt-5 border border-red-500 rounded-lg">
        <span>
          <CloudAlert size={42} />
        </span>
        <div>{message}</div>
      </div>
    </>
  )
}
