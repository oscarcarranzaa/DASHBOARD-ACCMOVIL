'use client'

import FunnelConversionRates from '@/components/customers/crm/pipeline/analitycs/conversionRates'
import FunnelChart from '@/components/customers/crm/pipeline/analitycs/funnelChart'
import FunnelHeaderAnalytics from '@/components/customers/crm/pipeline/analitycs/header/inde'
import LeadChart from '@/components/customers/crm/pipeline/analitycs/leadChart'
import UserSellChart from '@/components/customers/crm/pipeline/analitycs/userSellChart'
import NavegationPages from '@/components/navegationPages'

export default function FunnelSettings() {
  return (
    <>
      <NavegationPages text="Analisis de clientes potenciales" />
      <FunnelHeaderAnalytics />
      <FunnelConversionRates />
      <LeadChart />
      <div className="grid grid-cols-3 mt-5 gap-5">
        <div className="col-span-2">
          <UserSellChart />
        </div>
        <div>
          <FunnelChart />
        </div>
      </div>
    </>
  )
}
