'use client'

import FunnelConversionRates from '@/components/customers/crm/pipeline/analitycs/conversionRates'
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
      <div className="grid grid-cols-2 mt-5 gap-5">
        <div></div>
        <div>
          <UserSellChart />
        </div>
      </div>
    </>
  )
}
