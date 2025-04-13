import DetailsLead from '@/components/customers/leads/detailsLead'

export default async function LeadDetails({
  params,
}: {
  params: Promise<{ leadID: string }>
}) {
  const { leadID } = await params
  return (
    <>
      <div className=" h-screen  flex flex-col ">
        <DetailsLead leadId={leadID} />
      </div>
    </>
  )
}
