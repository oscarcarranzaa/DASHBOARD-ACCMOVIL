'use client'

import Spinner from '@/components/icons/spinner'
import { useDraggable } from '@dnd-kit/core'
import { Avatar, Chip, Tooltip } from '@heroui/react'
import dayjs from 'dayjs'
import { CircleChevronRight } from 'lucide-react'
import Link from 'next/link'

type TProps = {
  id: string
  title: string
  contactName: string
  pipelineId: string
  value?: number | null
  avatar?: string | null
  rottenDays?: number | null
  user?: string | null
  isPending?: boolean
  totalTimeSpent?: number | null
  initDate?: string | null
  now: dayjs.Dayjs
}
export default function LeadCard({
  id,
  title,
  contactName,
  value,
  avatar,
  pipelineId,
  user,
  rottenDays,
  now,
  initDate,
  totalTimeSpent,
  isPending,
}: TProps) {
  const { listeners, setNodeRef, attributes, transform, isDragging } =
    useDraggable({ id })
  const styles = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  const totalSeconds = Math.max(
    0,
    now.diff(dayjs(initDate), 'seconds') + (totalTimeSpent ?? 0)
  )

  const days = Math.floor(totalSeconds / 86400)
  const difference = rottenDays ? days - rottenDays : 0
  const isRotten = difference > 0

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      className={` p-1 flex items-center px-2 text-sm ${isRotten ? 'bg-red-50 dark:bg-red-950 dark:border-red-800 border-red-200 ' : 'dark:bg-zinc-950 border-zinc-200 dark:border-zinc-600 bg-white '}  shadow-sm rounded border ${isDragging ? 'z-50 right-0 left-0 px-1 py-2 cursor-grabbing' : ''}`}
    >
      <Link
        href={`/dash/embudo/${pipelineId}/${id}`}
        className={`w-full  ${isDragging ? 'pointer-events-none' : ''} ${isPending ? 'opacity-60' : ''}`}
      >
        <p className=" font-medium text-base max-w-96 break-words line-clamp-3">
          {title}
        </p>
        <p className="mt-1 opacity-70">{contactName}</p>

        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center mt-1">
            <Tooltip content={user} size="sm">
              <Avatar className="w-5 h-5" src={avatar ?? undefined} />
            </Tooltip>
            {isRotten && (
              <Tooltip
                placement="top"
                content={`${difference} días estancado en esta etapa`}
                size="sm"
                color="danger"
                delay={500}
                containerPadding={0}
                closeDelay={0}
                className="text-[11px]"
                shouldCloseOnBlur={false}
                showArrow
              >
                <Chip variant="bordered" size="sm" radius="full" color="danger">
                  {'<'} {difference}d
                </Chip>
              </Tooltip>
            )}
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
