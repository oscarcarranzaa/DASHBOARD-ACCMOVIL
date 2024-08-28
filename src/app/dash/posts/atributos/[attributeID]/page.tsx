'use client'

import { getOneAttribute } from '@/api/attributes'
import FormTerms from '@/components/attributes/terms/formTerms'
import ListTerms from '@/components/attributes/terms/listTerms'
import NavegationPages from '@/components/navegationPages'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export default function AttributeID() {
  const params = useParams()
  const ID = params.attributeID
  const { data, isPending } = useQuery({
    queryKey: ['oneAtt', ID],
    queryFn: () => getOneAttribute(ID.toString()),
    refetchOnWindowFocus: false,
  })
  return (
    <>
      <NavegationPages text="Atributos" />

      <div className="grid grid-cols-6 gap-3 ">
        <div className=" col-span-2 ">
          <div className="  top-5">
            {data && <FormTerms type={data.type} />}
          </div>
        </div>
        <div className=" col-span-4">
          <ListTerms data={data} isPending={isPending} />
        </div>
      </div>
    </>
  )
}
