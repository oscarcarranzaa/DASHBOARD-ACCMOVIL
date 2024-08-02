'use client'
import DragMedia from '@/components/media/upload/drag'
import getMedia from '@/utils/getMedia'

const selectOp = {
  ONLY: 'only',
  MULTIPLE: 'multiple',
} as const

export type TSelectMedia = {
  select?: (typeof selectOp)[keyof typeof selectOp]
}

export default function Media({ select }: TSelectMedia) {
  const { data, totalPages } = getMedia()
  return <DragMedia select={select} dataMedia={data} totalPages={totalPages} />
}
