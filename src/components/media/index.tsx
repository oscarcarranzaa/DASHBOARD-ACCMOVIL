'use client'
import DragMedia from '@/components/media/upload/drag'
import useGetMedia from '@/hooks/useGetMedias'

const selectOp = {
  ONLY: 'only',
  MULTIPLE: 'multiple',
} as const

export type TSelectMedia = {
  select?: (typeof selectOp)[keyof typeof selectOp]
}

export default function Media({ select }: TSelectMedia) {
  const { data, totalPages } = useGetMedia()
  return <DragMedia select={select} dataMedia={data} totalPages={totalPages} />
}
