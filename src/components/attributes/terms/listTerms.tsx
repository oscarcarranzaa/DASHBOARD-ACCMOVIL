'use client'
import { useParams } from 'next/navigation'
import IconTerm from './iconTerm'
import { useQuery } from '@tanstack/react-query'
import { getOneAttribute } from '@/api/attributes'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from '@nextui-org/react'
import { ZTermsSchema } from '@/types/attributes'
import { useCallback } from 'react'

export default function ListTerms() {
  const params = useParams()
  const ID = params.attributeID
  const { data, isPending } = useQuery({
    queryKey: ['oneAtt', ID],
    queryFn: () => getOneAttribute(ID.toString()),
    refetchOnWindowFocus: false,
  })
  const rows = [
    {
      key: 'preview',
      name: 'Mostrar',
    },
    {
      key: 'name',
      name: 'Nombre',
    },
    {
      key: 'slug',
      name: 'Slug',
    },
  ]
  const renderCell = useCallback(
    (term: ZTermsSchema, columnKey: React.Key) => {
      switch (columnKey) {
        case 'preview':
          const image = term.image?.images
            ? term.image.images[0].src
            : undefined
          return (
            <IconTerm
              type={data ? data.type : ''}
              colors={term.colors}
              image={image}
            />
          )
        case 'name':
          return term.name
        case 'slug':
          return term.slug
      }
    },
    [data]
  )
  const loadingState = isPending ? 'loading' : 'idle'
  const getTerms = data?.terms || []
  return (
    <div>
      <p className="mb-3 text-lg font-semibold">
        Términos del atributo {data?.name}
      </p>
      <Table isHeaderSticky isStriped aria-label="Atributos">
        <TableHeader>
          {rows.map((r) => {
            return <TableColumn key={r.key}>{r.name}</TableColumn>
          })}
        </TableHeader>
        <TableBody
          emptyContent={'No se encontraron terminos'}
          items={getTerms}
          loadingState={loadingState}
          loadingContent={<Spinner label="Cargando..." />}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell align="center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
