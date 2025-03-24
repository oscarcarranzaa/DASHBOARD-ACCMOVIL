import LeadHeader from '@/components/customers/leads/leadHeader'
import LeadList from '@/components/customers/leads/leadsList'
import NewLead from '@/components/customers/leads/newLead'
import NavegationPages from '@/components/navegationPages'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function Leads() {
  return (
    <div>
      <NavegationPages text="Clientes potenciales" />
      <LeadHeader />
    </div>
  )
}
