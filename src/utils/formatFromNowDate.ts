import dayjs from 'dayjs'
import 'dayjs/locale/es-mx'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('es-mx')
export default function formaFromNowDate(date?: string | null) {
  let DateInfo = 'N/D'
  if (!date) return DateInfo
  const now = dayjs()
  const inputDate = dayjs(date)
  if (now.diff(inputDate, 'week') < 1) {
    DateInfo = inputDate.fromNow()
  } else {
    DateInfo = inputDate.format('DD/MM/YY h:mm A')
  }
  return DateInfo
}
