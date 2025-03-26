import NavegationPages from '@/components/navegationPages'
import LeadDrag from '@/components/customers/leads/leadsDrag'

export default async function Leads({
  params,
}: {
  params: Promise<{ funnel: string }>
}) {
  const { funnel } = await params
  return (
    <div className="flex flex-col h-full">
      <NavegationPages text="Clientes potenciales" />
      <LeadDrag pipelineId={funnel} />
    </div>
  )
}
