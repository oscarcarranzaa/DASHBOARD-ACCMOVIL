'use client'
import { getAllAttributes } from '@/api/attributes'
import ItemsAttributes from '@/components/attributes/itemsAttributes'
import ItemsAttributesSkeleton from '@/components/attributes/itemsAttributesSkeleton'
import NewAttribute from '@/components/attributes/newAttribute'
import NavegationPages from '@/components/navegationPages'
import { useQuery } from '@tanstack/react-query'

export default function Attributes() {
  const { data } = useQuery({
    queryKey: ['Attributes'],
    queryFn: getAllAttributes,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <div className="flex justify-between">
        <NavegationPages text="Atributos" />
        <NewAttribute />
      </div>
      <p className="mb-10">
        Mostrando todos los atributos creados para tus productos...
      </p>
      <div className=" grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 w-full flex-wrap select-none">
        {data ? (
          data.map((att) => {
            const termsMessage = `${att.terms} terms`
            return (
              <ItemsAttributes
                key={att.id}
                _id={att.id}
                name={att.name}
                type={att.type}
                terms={termsMessage}
              />
            )
          })
        ) : (
          <ItemsAttributesSkeleton />
        )}
      </div>
    </>
  )
}
