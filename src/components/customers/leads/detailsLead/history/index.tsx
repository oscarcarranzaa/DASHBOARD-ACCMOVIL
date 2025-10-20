'use client'

import { getLeadHistory } from '@/api/crm'
import { useQuery } from '@tanstack/react-query'
import NotesHistory from './hitoryItems/notes'
import StatusHistory from './hitoryItems/status'
import FileHistory from './hitoryItems/file'
import HistoryTime from './hitoryItems/time'
import {
  Activity,
  Bot,
  Contact,
  File,
  Recycle,
  RefreshCcw,
  Trash,
  User,
} from 'lucide-react'
import LeadStatusBar from './statusBar'
import { Avatar, Button } from '@heroui/react'
import { JSX, useState } from 'react'
import SkeletonHistory from './skeleton'
import { changelogSchema } from '@/types/crm/leads'
import Image from 'next/image'

type TProps = {
  leadId: string
  hiddenButtons?: boolean
}
type TFilter = 'history' | 'logs' | 'files' | 'notes'
const fieldKeyMap: Record<
  changelogSchema['field_key'],
  { color: 'danger' | 'success' | 'warning' | 'primary'; icon: JSX.Element }
> = {
  USER: { color: 'primary', icon: <User size={16} /> },
  CONTACT: { color: 'primary', icon: <Contact size={16} /> },
  STATUS: { color: 'success', icon: <Activity size={16} /> },
  CREATED: { color: 'primary', icon: <User size={16} /> },
  STAGE: { color: 'success', icon: <Activity size={16} /> },
  DELETED: { color: 'danger', icon: <Trash size={16} /> },
  RESTORE: { color: 'primary', icon: <Recycle size={16} /> },
  SYSTEM: { color: 'primary', icon: <Bot size={16} /> },
}

export default function LeadHistory({ leadId, hiddenButtons }: TProps) {
  const [filter, setFilter] = useState<TFilter>('history')
  const include = (name: TFilter) => filter === name || filter === 'history'

  const { data, isPending, refetch, isFetching, isError } = useQuery({
    queryKey: [leadId, 'history', filter],
    queryFn: () =>
      getLeadHistory({
        leadId,
        file: include('files'),
        changeLogs: include('logs'),
        notes: include('notes'),
      }),
    retry: 1,
    refetchOnWindowFocus: false,
  })
  const files =
    data?.file?.map((f) => ({ file: f, createdAt: f.createdAt })) || []
  const changeLogs =
    data?.changeLogs?.map((f) => ({ changelogs: f, createdAt: f.createdAt })) ||
    []
  const notes =
    data?.notes?.map((f) => ({ notes: f, createdAt: f.createdAt })) || []

  const histories = [files, changeLogs, notes].flat()

  const sorted = histories.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  console.log(sorted)
  const ButtonsNav: { name: string; key: TFilter }[] = [
    {
      name: 'Historial',
      key: 'history',
    },
    {
      name: 'Logs',
      key: 'logs',
    },
    {
      name: 'Notas',
      key: 'notes',
    },
    {
      name: 'Archivos',
      key: 'files',
    },
  ]
  return (
    <>
      <div
        className={`mt-5 flex justify-between items-center ${hiddenButtons ? 'hidden' : ''}`}
      >
        <div className="flex">
          {ButtonsNav.map((btn) => {
            return (
              <Button
                key={btn.key}
                variant="flat"
                color={filter === btn.key ? 'primary' : 'default'}
                size="sm"
                isDisabled={isPending}
                radius="none"
                onPress={() => setFilter(btn.key)}
              >
                {btn.name}
              </Button>
            )
          })}
        </div>
        <Button
          isIconOnly
          variant="bordered"
          size="sm"
          className=" text-opacity-60"
          radius="full"
          isDisabled={isFetching}
          onPress={() => refetch()}
        >
          <div className={isFetching ? 'animate-spin' : ''}>
            <RefreshCcw size={18} />
          </div>
        </Button>
      </div>
      <div className="mt-5 flex flex-col  mb-10">
        {isPending && <SkeletonHistory />}
        {sorted.length === 0 && isError && (
          <div className="flex flex-col items-center justify-center h-full mt-10">
            <Image
              src="/static/history_not_found.webp"
              alt="empty"
              width={100}
              height={100}
            />
            <p className="text-center text-gray-500 mt-5 mb-5">
              Ocurrió un error al obtener el historial.
            </p>
            <Button
              variant="flat"
              color="primary"
              size="sm"
              onPress={() => refetch()}
            >
              Intentar de nuevo
            </Button>
          </div>
        )}
        {sorted.map((history) => {
          if ('file' in history) {
            return (
              <div className="flex gap-3" key={history.file.id}>
                <LeadStatusBar color="warning" render={<File size={16} />} />
                <div className="pb-6 grow">
                  <FileHistory
                    fileName={history.file.name}
                    fileSize={history.file.file_size}
                    fileType={history.file.file_type}
                    date={history.file.createdAt}
                    url={history.file.url}
                  />
                  <HistoryTime
                    source="App web"
                    name={history.file.user.firstName}
                    date={history.file.createdAt}
                  />
                </div>
              </div>
            )
          } else if ('changelogs' in history) {
            return (
              <div className="flex gap-3" key={history.changelogs.id}>
                <LeadStatusBar
                  color={fieldKeyMap[history.changelogs.field_key].color}
                  render={fieldKeyMap[history.changelogs.field_key].icon}
                />
                <div className="pb-6">
                  <StatusHistory
                    avatar={history.changelogs.user.avatar}
                    type={history.changelogs.field_key}
                    oldValue={history.changelogs.old_value_formatted}
                    newValue={history.changelogs.new_value_formatted}
                  />
                  <HistoryTime
                    name={history.changelogs.user.firstName}
                    source="App web"
                    date={history.changelogs.createdAt}
                  />
                </div>
              </div>
            )
          } else if ('notes' in history) {
            const avatar = history.notes.user.avatar
              ? `${history.notes.user.avatar}-thumb.webp`
              : undefined

            return (
              <div className="flex gap-3" key={history.notes.id}>
                <LeadStatusBar
                  render={<Avatar src={avatar} className="w-8 h-8" />}
                />
                <div className="pb-6 grow">
                  <NotesHistory
                    key={history.notes.id}
                    user={history.notes.user.firstName}
                    noteId={history.notes.id}
                    avatar={avatar}
                    date={history.notes.createdAt}
                    content={history.notes.content}
                  />
                </div>
              </div>
            )
          }
        })}
      </div>
    </>
  )
}
