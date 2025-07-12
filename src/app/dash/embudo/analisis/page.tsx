'use client'

import FunnelConversionRates from '@/components/customers/crm/pipeline/analitycs/conversionRates'
import FunnelChart from '@/components/customers/crm/pipeline/analitycs/funnelChart'
import FunnelHeaderAnalytics, {
  FilterFunnelAnalitycs,
} from '@/components/customers/crm/pipeline/analitycs/header/inde'
import LeadChart from '@/components/customers/crm/pipeline/analitycs/leadChart'
import UserSellChart from '@/components/customers/crm/pipeline/analitycs/userSellChart'
import NavegationPages from '@/components/navegationPages'
import { useState } from 'react'

export default function FunnelAnalitycs() {
  const [filter, setFilters] = useState<FilterFunnelAnalitycs | null>()
  return (
    <>
      <NavegationPages text="Analisis de clientes potenciales" />
      <FunnelHeaderAnalytics onChangeFilters={setFilters} />
      <FunnelConversionRates filters={filter} />
      <LeadChart filters={filter} />
      <div className="grid lg:grid-cols-7 grid-cols-2 mt-5 gap-5">
        <div className="lg:col-span-4 col-span-2">
          <UserSellChart filers={filter} />
        </div>
        <div className="lg:col-span-3 col-span-2">
          <FunnelChart filers={filter} />
        </div>
      </div>
    </>
  )
}
