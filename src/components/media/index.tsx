'use client'
import DragMedia from '@/components/media/upload/drag'

const selectOp = {
  ONLY: 'only',
  MULTIPLE: 'multiple',
} as const

export type TSelectMedia = {
  select?: (typeof selectOp)[keyof typeof selectOp]
}

export default function Media({ select }: TSelectMedia) {
  return <DragMedia select={select} />
}
