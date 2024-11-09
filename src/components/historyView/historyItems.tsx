import { Avatar } from '@nextui-org/react'
import { TPropsHistory } from '.'
import HistoryImage from './typeHistory/image'
import HistoryInfo from './typeHistory/info'
import HistoryMessage from './typeHistory/message'
import HistoryPdf from './typeHistory/pdf'
import HistoryStatus from './typeHistory/status'
import dayjs from 'dayjs'

export default function HistoryItem({
  type,
  image,
  message,
  status,
  info,
  date,
  user,
  pdf,
}: TPropsHistory) {
  const renderHistoty = () => {
    switch (type) {
      case 'IMAGE':
        return <HistoryImage imageUrl={image} />
      case 'MESSAGE':
        return <HistoryMessage message={message} />
      case 'STATUS':
        return <HistoryStatus status={status} color="success" />
      case 'INFO':
        return <HistoryInfo info={info} />
      case 'PDF':
        return <HistoryPdf />
    }
  }
  const userData = {
    avatar: user?.avatar ?? '/static/bot-default.webp',
    name: user?.name ?? 'Sistema',
  }
  return (
    <>
      <div className=" dark:border-zinc-700  mb-5">
        <div className="w-10/12">{renderHistoty()}</div>
        <div className="flex gap-1 mt-1 ">
          {user && (
            <Avatar
              className="w-6 h-6 text-tiny"
              src={userData.avatar}
              alt={`Imagen de perfil de ${userData.name}`}
            />
          )}
          <div className="mt-1 flex gap-2 items-center mb-2">
            <p className=" text-sm font-medium">{userData.name}</p>
            <p className=" text-xs opacity-70">
              {dayjs(date).format('h:mm A')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
