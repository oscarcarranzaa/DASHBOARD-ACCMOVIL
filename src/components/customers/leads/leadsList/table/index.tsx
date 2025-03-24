import { allLeadShema, leadSchema } from '@/types/crm/leads'
import { useCallback, useMemo } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
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
} from '@heroui/react'
import { EllipsisVerticalIcon, MoveRight } from 'lucide-react'
import { columns } from './columns'
import PaginationPage from '@/components/UI/pagination'
import dayjs from 'dayjs'
import ContactCardPreview from '@/components/customers/contacts/contactInput/contactCard'
import Link from 'next/link'
import styles from './style.module.css'
import formaFromNowDate from '@/utils/formatFromNowDate'
import NewLead from '../../newLead'
import PipelineCard from './pipelineCard'

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
  const renderLeadCell = useCallback(
    (lead: leadSchema, columnKey: React.Key) => {
      switch (columnKey) {
        case 'person':
          const { id, name, email, phone } = lead.contact
          return (
            <div className={styles.box_content}>
              <Link
                href={`/dash/crm/clientes-potenciales/${lead.id}`}
                className="hover:underline"
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
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown
                className="bg-background border-1 border-default-200"
                shouldBlockScroll={false}
              >
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <EllipsisVerticalIcon className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="delete">Eliminar</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
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
              href={`/dash/crm/clientes-potenciales/${lead.id}`}
              className="hover:underline"
            >
              {lead.title.length > 0 ? lead.title : '-'}
            </Link>
          )
        case 'user':
          return lead.user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar
                  className="hover:cursor-pointer"
                  src={
                    lead.user.avatar
                      ? `${lead.user.avatar}-thumb.webp`
                      : undefined
                  }
                  size="sm"
                  name={lead.user.firstName}
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
                        name={lead.user.firstName}
                        src={
                          lead.user.avatar
                            ? `${lead.user.avatar}-thumb.webp`
                            : undefined
                        }
                      />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {`${lead.user.firstName} ${lead.user.lastName}`}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                          <Link
                            href={`/dash/usuarios/${lead.user.username}`}
                            className="hover:underline"
                          >
                            @{lead.user.username}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </PopoverContent>
            </Popover>
          ) : (
            '-'
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
    [leadsData]
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
          loadingContent={<Spinner label="Cargando..." />}
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
