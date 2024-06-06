'use client'
import { getAllAttributes } from '@/api/attributes'
import Select from '@/components/UI/select'
import { useQuery } from '@tanstack/react-query'

export default function ManagerAttributes() {
  const { data, isPending } = useQuery({
    queryKey: ['Attributes'],
    queryFn: getAllAttributes,
    refetchOnWindowFocus: false,
  })
  const options = data ? data.map((op) => op.name) : null
  return (
    <div>
      <Select />
    </div>
  )
}
