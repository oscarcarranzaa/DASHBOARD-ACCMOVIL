import LeadList from '@/components/customers/leads/leadsList'
import NavegationPages from '@/components/navegationPages'

export default async function Leads() {
  return (
    <div>
      <NavegationPages text="Clientes potenciales" />
      <LeadList />
    </div>
  )
}
