'use client'

import Spinner from '@/components/icons/spinner'
import { useDraggable } from '@dnd-kit/core'
import { Avatar, Chip, Tooltip } from '@heroui/react'
import { CircleChevronRight } from 'lucide-react'
import Link from 'next/link'

type TProps = {
  id: string
  title: string
  contactName: string
  pipelineId: string
  value?: number | null
  avatar?: string | null
  user?: string | null
  isPending?: boolean
}
export default function LeadCard({
  id,
  title,
  contactName,
  value,
  avatar,
  pipelineId,
  user,
  isPending,
}: TProps) {
  const { listeners, setNodeRef, attributes, transform, isDragging } =
    useDraggable({ id })
  const styles = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      className={`bg-zinc-50 p-1 flex items-center px-2 text-sm dark:bg-zinc-900 shadow-lg rounded border border-zinc-300 dark:border-zinc-700 ${isDragging ? 'z-50 right-0 left-0 px-1 py-2 cursor-grabbing' : ''}`}
    >
      <Link
        href={`/dash/embudo/${pipelineId}/${id}`}
        className={`w-full ${isDragging ? 'pointer-events-none' : ''} ${isPending ? 'opacity-60' : ''}`}
      >
        <p className=" font-medium text-base">{title}</p>
        <p className="mt-1 opacity-70">{contactName}</p>

        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center mt-1">
            <Tooltip content={user} size="sm">
              <Avatar className="w-5 h-5" src={avatar ?? undefined} />
            </Tooltip>
            <Chip variant="bordered" size="sm" radius="full" color="danger">
              1D
            </Chip>
            <p className="opacity-80">
              {value?.toLocaleString('es-HN', {
                style: 'currency',
                currency: 'HNL',
              })}
            </p>
          </div>
        </div>
      </Link>
      <div className="text-zinc-500">
        {isPending ? (
          <Spinner size={18} fill="#777" />
        ) : (
          <CircleChevronRight size={18} />
        )}
      </div>
    </div>
  )
}
