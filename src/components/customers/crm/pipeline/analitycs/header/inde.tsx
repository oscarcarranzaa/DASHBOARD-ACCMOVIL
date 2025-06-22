'use client'
import type { RangeValue } from '@react-types/shared'
import type { DateValue } from '@react-types/datepicker'

import { DateRangePicker, Select, SelectItem, Selection } from '@heroui/react'
import { getLocalTimeZone, CalendarDate, today } from '@internationalized/date'
import { useState } from 'react'
import { Calendar } from 'lucide-react'

export default function FunnelHeaderAnalytics() {
  const [selectValue, setSelectValue] = useState<Selection>(new Set(['30']))
  const [value, setValue] = useState<RangeValue<DateValue> | null>({
    start: today(getLocalTimeZone()).subtract({ days: 30 }),
    end: today(getLocalTimeZone()),
  })
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

    setValue({ start, end })
  }
  const handleDate = (value: RangeValue<DateValue> | null) => {
    setValue(value)
    setSelectValue(new Set([]))
  }
  return (
    <div className="flex w-full justify-between max-w-full bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg mb-4">
      <div></div>
      <div className="flex">
        <Select
          defaultSelectedKeys={['30']}
          aria-label="Seleccionar periodo"
          placeholder="Seleccione un periodo"
          className="min-w-48"
          size="sm"
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
          size="sm"
          className=" max-w-72"
          maxValue={today(getLocalTimeZone())}
        />
      </div>
    </div>
  )
}
