'use client'

import { getLeadHistory } from '@/api/crm'
import { useQuery } from '@tanstack/react-query'
import NotesHistory from './hitoryItems/notes'
import StatusHistory from './hitoryItems/status'
import FileHistory from './hitoryItems/file'
import HistoryTime from './hitoryItems/time'
import { Activity, File, RefreshCcw, User } from 'lucide-react'
import LeadStatusBar from './statusBar'
import { Avatar, Button } from '@heroui/react'
import { useState } from 'react'
import SkeletonHistory from './skeleton'

type TProps = {
  leadId: string
  hiddenButtons?: boolean
}
type TFilter = 'history' | 'logs' | 'files' | 'notes'

export default function LeadHistory({ leadId, hiddenButtons }: TProps) {
  const [filter, setFilter] = useState<TFilter>('history')

  const include = (name: TFilter) => filter === name || filter === 'history'

  const { data, isPending, refetch, isFetching, error } = useQuery({
    queryKey: [leadId, 'history', filter],
    queryFn: () =>
      getLeadHistory({
        leadId,
        file: include('files'),
        changeLogs: include('logs'),
        notes: include('notes'),
      }),
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
        {sorted.map((history) => {
          if ('file' in history) {
            return (
              <div className="flex gap-3" key={history.file.id}>
                <LeadStatusBar color="warning" render={<File size={16} />} />
                <div className="pb-6 flex-grow">
                  <FileHistory
                    fileName={history.file.name}
                    fileSize={history.file.file_size}
                    fileType={history.file.file_type}
                    date={history.file.createdAt}
                    url={history.file.url}
                  />
                  <HistoryTime
                    source="Aplicación web"
                    name={history.file.user.firstName}
                    date={history.file.createdAt}
                  />
                </div>
              </div>
            )
          } else if ('changelogs' in history) {
            return (
              <div className="flex gap-3" key={history.changelogs.id}>
                {history.changelogs.field_key !== 'USER' ? (
                  <LeadStatusBar
                    color="success"
                    render={<Activity size={16} />}
                  />
                ) : (
                  <LeadStatusBar color="primary" render={<User size={16} />} />
                )}
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
                  color="danger"
                  render={<Avatar src={avatar} className="w-8 h-8" />}
                />
                <div className="pb-6 flex-grow">
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
