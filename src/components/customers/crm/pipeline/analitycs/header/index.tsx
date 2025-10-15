/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import type { RangeValue } from '@react-types/shared'
import type { DateValue } from '@heroui/react'

import { DateRangePicker, Select, SelectItem, Selection } from '@heroui/react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'lucide-react'
import SelectUser from '@/components/users/selectUser'
import SelectPipeline from '../../selectPipeline'
import { useAuthStore } from '@/store/auth'

export type FilterFunnelAnalitycs = {
  userId: string | null
  funnelId: string | null
  from: string | null
  to: string | null
}
type TProps = {
  onChangeFilters?: (filters: FilterFunnelAnalitycs) => void
}

export default function FunnelHeaderAnalytics({ onChangeFilters }: TProps) {
  const [selectValue, setSelectValue] = useState<Selection>(new Set(['30']))
  const [userId, setUserId] = useState<string | null>(null)
  const [funnelId, setFunnelId] = useState<string | null>(null)
  const { user } = useAuthStore()

  const [value, setValue] = useState<RangeValue<DateValue> | null>(null)
  const isFirstRun = useRef(true)
  const relativeTimeSelect = [
    {
      key: '7',
      label: 'Ultimos 7 dias',
    },
    {
      key: '30',
      label: 'Ultimos 30 dias',
    },
    {
      key: '90',
      label: 'Ultimos 3 meses',
    },
    {
      key: '180',
      label: 'Ultimos 6 meses',
    },
    {
      key: '365',
      label: 'Ultimo año',
    },
  ]

  const handleChange = (key: string) => {
    const days = parseInt(key, 10)
    if (isNaN(days) || days <= 0) return

    const end = today(getLocalTimeZone())
    const start = end.subtract({ days })
    if (!start || !end) return
    setValue({ start, end })
  }
  const handleDate = (value: RangeValue<DateValue> | null) => {
    setValue(value)
    setSelectValue(new Set([]))
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    if (onChangeFilters) {
      onChangeFilters({
        userId,
        funnelId,
        from: value?.start?.toString() ?? null,
        to: value?.end?.toString() ?? null,
      })
    }
  }, [userId, funnelId, value])

  return (
    <div className="flex flex-col lg:flex-row w-full  justify-between max-w-full gap-3 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg mb-4">
      <div>
        {' '}
        <p className="font-medium">Filtros:</p>
        <div className="flex gap-1">
          <SelectPipeline
            isRequired={false}
            value={funnelId}
            onChange={setFunnelId}
            placeholder="Todos los embudos"
          />
          {user?.is_owner ? (
            <>
              <SelectUser
                value={userId}
                placeholder="Todos los usuarios"
                onChange={setUserId}
              />
            </>
          ) : null}
        </div>
      </div>
      <div>
        <p className="font-medium">Fecha:</p>
        <div className="flex items-center gap-1">
          <Select
            defaultSelectedKeys={['30']}
            aria-label="Seleccionar periodo"
            placeholder="Seleccione un periodo"
            className="min-w-48"
            selectedKeys={selectValue}
            onSelectionChange={(e) => {
              setSelectValue(e)
              if (e.currentKey) [handleChange(e.currentKey)]
            }}
            variant="bordered"
            startContent={<Calendar opacity={0.6} />}
          >
            {relativeTimeSelect.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
          <DateRangePicker
            aria-label="Seleccionar rango de fechas"
            labelPlacement="outside-left"
            selectorButtonPlacement="start"
            variant="bordered"
            value={value}
            onChange={handleDate}
            className=" max-w-72"
            maxValue={today(getLocalTimeZone())}
          />
        </div>
      </div>
    </div>
  )
}
