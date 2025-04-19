import LeadList from '@/components/customers/leads/leadsList'
import NavegationPages from '@/components/navegationPages'
import { Suspense } from 'react'

export default async function Leads() {
  return (
    <div>
      <NavegationPages text="Clientes potenciales" />
      <Suspense>
        <LeadList />
      </Suspense>
    </div>
  )
}
