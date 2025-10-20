/* eslint-disable react-hooks/exhaustive-deps */
import { allLeadShema, leadSchema } from '@/types/crm/leads'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  CardHeader,
  Card,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  addToast,
} from '@heroui/react'
import { Copy, Ellipsis, MoveRight, Trash } from 'lucide-react'
import { columns } from './columns'
import PaginationPage from '@/components/UI/pagination'
import dayjs from 'dayjs'
import ContactCardPreview from '@/components/customers/contacts/contactInput/contactCard'
import Link from 'next/link'
import styles from './style.module.css'
import formaFromNowDate from '@/utils/formatFromNowDate'
import NewLead from '../../newLead'
import PipelineCard from './pipelineCard'
import DeleteLeadModal from '../../leadActions/deleteModal'
import DropDown from '@/components/UI/dropDown/dropDown'
import { socket } from '@/lib/socket'
import { useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { duplicateLead } from '@/api/crm'
import ActionCellLeadList from './actionsCell'

type TProps = {
  leadsData?: allLeadShema
  totalPages?: number
  isPending?: boolean
}

export default function LeadTable({
  leadsData,
  isPending,
  totalPages,
}: TProps) {
  const data = leadsData?.data

  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('leadPage')) || 1
  const funnelId = searchParams.get('id') || undefined
  const queryClient = useQueryClient()
  const queryKey = ['leads', currentPage.toString(), funnelId]

  const [isDuplicatePending, setIsDuplicatePending] = useState<string | null>(
    null
  )

  const { mutate } = useMutation({
    mutationFn: duplicateLead,
    onSuccess: () => {
      addToast({
        title: 'Éxito',
        description: 'Se creó el cliente potencial duplicado exitosamente.',
        variant: 'bordered',
        color: 'success',
      })
      queryClient.invalidateQueries({
        queryKey: ['leads', currentPage.toString(), funnelId],
      })
      console.log('Lead duplicado exitosamente', queryKey)
    },
    onError: (error) => {
      console.log(error)
      addToast({
        title: 'Error al duplicar el cliente potencial',
        description: error.message,
        variant: 'bordered',
        color: 'danger',
      })
    },
    onSettled: () => {
      setIsDuplicatePending(null)
    },
  })

  useEffect(() => {
    const handleStageChanged = (data: {
      lead: leadSchema
      newStageId: string
    }) => {
      queryClient.setQueryData(queryKey, (oldData: allLeadShema) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          data: oldData.data.map((lead) =>
            lead.id === data.lead.id
              ? { ...lead, stageId: data.newStageId }
              : lead
          ),
        }
      })
    }

    socket.on('lead:stageChanged', handleStageChanged)

    return () => {
      socket.off('lead:stageChanged', handleStageChanged)
    }
  }, [queryClient])

  const handleDuplicate = (leadId: string) => {
    setIsDuplicatePending(leadId)
    mutate({ id: leadId })
  }

  const renderLeadCell = useCallback(
    (lead: leadSchema, columnKey: React.Key) => {
      const isStatusClass =
        lead.status === 'WON'
          ? 'text-success-500'
          : lead.status === 'LOST'
            ? 'text-danger-500'
            : ''
      switch (columnKey) {
        case 'person':
          if (!lead.contact) return 'Contacto eliminado'
          const { id, name, email, phone } = lead.contact
          return (
            <div className={styles.box_content}>
              <Link
                href={`/dash/embudo/${lead.pipelineId}/${lead.id}`}
                className={`${isStatusClass} hover:underline`}
              >
                {lead.contact.name}
              </Link>
              <div className={styles.card_tooltip}>
                <ContactCardPreview
                  id={id}
                  name={name}
                  email={email}
                  phone={phone}
                />
              </div>
            </div>
          )
        case 'actions':
          return (
            <ActionCellLeadList
              leadId={lead.id}
              title={lead.title}
              funnelId={funnelId}
              currentPage={currentPage}
            />
          )
        case 'previusDate':
          return (
            <p>
              {lead.expectedCloseDate
                ? dayjs(lead.expectedCloseDate).format('DD/MM/YYYY')
                : '-'}
            </p>
          )
        case 'title':
          return (
            <Link
              href={`/dash/embudo/${lead.pipelineId}/${lead.id}`}
              className={`${isStatusClass} hover:underline`}
            >
              {lead.title.length > 0 ? lead.title : '-'}
            </Link>
          )
        case 'assing':
          return lead.assignedTo ? (
            <Popover>
              <PopoverTrigger>
                <Avatar
                  className="hover:cursor-pointer"
                  src={
                    lead.assignedTo.avatar
                      ? `${lead.assignedTo.avatar}-thumb.webp`
                      : undefined
                  }
                  size="sm"
                  name={lead.assignedTo.firstName}
                />
              </PopoverTrigger>
              <PopoverContent>
                <Card
                  className="max-w-[300px] border-none bg-transparent"
                  shadow="none"
                >
                  <CardHeader className="justify-between">
                    <div className="flex gap-3">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        name={lead.assignedTo.firstName}
                        src={
                          lead.assignedTo.avatar
                            ? `${lead.assignedTo.avatar}-thumb.webp`
                            : undefined
                        }
                      />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {`${lead.assignedTo.firstName} ${lead.assignedTo.lastName}`}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                          <Link
                            href={`/dash/usuarios/${lead.assignedTo.username}`}
                            className="hover:underline"
                          >
                            @{lead.assignedTo.username}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </PopoverContent>
            </Popover>
          ) : (
            'No asingnado'
          )
        case 'pipeline':
          const findPipeline = leadsData?.pipelines?.find(
            (p) => p.id === lead.pipelineId
          )
          const findStage = findPipeline?.stages.find(
            (s) => s.id === lead.stageId
          )
          return (
            <Popover placement="right" showArrow className="rouded-sm">
              <PopoverTrigger>
                <div className="border-2 cursor-pointer px-1 border-transparent hover:border-zinc-500">
                  <p className="text-xs opacity-70">{findPipeline?.name}</p>
                  <div className="flex gap-1 items-center">
                    <MoveRight size={14} color="#777" />
                    <p className="text-sm opacity-90">{findStage?.name}</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <PipelineCard
                  leadVisibility={lead.visibility}
                  leadStatus={lead.status}
                  leadId={lead.id}
                  pipeline={findPipeline}
                  description={lead.title}
                  contact={lead.contact}
                  stageId={lead.stageId}
                  expectedClosed={lead.expectedCloseDate}
                  value={lead.value}
                />
              </PopoverContent>
            </Popover>
          )
        case 'created':
          return <p>{formaFromNowDate(lead.createdAt)}</p>
        default:
          return 'holz'
      }
    },
    [leadsData, isDuplicatePending]
  )

  const classNames = useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        'group-data-[first=true]/tr:first:before:rounded-none',
        'group-data-[first=true]/tr:last:before:rounded-none',
        'group-data-[middle=true]/tr:before:rounded-none',
        'group-data-[last=true]/tr:first:before:rounded-none',
        'group-data-[last=true]/tr:last:before:rounded-none',
      ],
    }),
    []
  )
  const loadingState = isPending ? 'loading' : 'idle'
  return (
    <>
      <Table
        isCompact
        removeWrapper
        classNames={classNames}
        aria-label="Mostrar leads"
        bottomContent={
          totalPages && totalPages > 0 ? (
            <div className="flex w-full justify-center">
              <PaginationPage totalPages={totalPages} pageName="leadPage" />
            </div>
          ) : null
        }
      >
        <TableHeader>
          {columns.map((r) => {
            return <TableColumn key={r.uid}>{r.name}</TableColumn>
          })}
        </TableHeader>
        <TableBody
          emptyContent={
            <div>
              <p className="mb-10">
                No se encontraron resultados, comienza agregando nuevos clientes
                potenciales.
              </p>
              <NewLead button={{ variant: 'faded' }} />
            </div>
          }
          items={data ?? []}
          loadingState={loadingState}
          loadingContent={
            <Spinner variant="spinner" label="Obteniendo datos..." />
          }
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {(columnKey) => (
                <TableCell align="center">
                  {renderLeadCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
