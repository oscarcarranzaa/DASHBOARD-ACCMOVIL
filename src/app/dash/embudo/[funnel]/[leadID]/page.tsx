import DetailsLead from '@/components/customers/leads/detailsLead'
import NavegationPages from '@/components/navegationPages'

export default async function LeadDetails({
  params,
}: {
  params: Promise<{ leadID: string }>
}) {
  const { leadID } = await params
  return (
    <>
      <NavegationPages text="Detalles del cliente potencial" />

      <DetailsLead leadId={leadID} />
    </>
  )
}
