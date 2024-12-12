import BellActiveSVG from '@/components/icons/bellActive'
import BellDisabledSVG from '@/components/icons/bellDisabled'
import EmailClosedSVG from '@/components/icons/emailClosed'

const ICON_SIZE = 18
export const contactStatusOption = [
  {
    label: 'Suscrito',
    key: 'SUBSCRIBED',
    icon: <BellActiveSVG size={ICON_SIZE} />,
  },
  {
    label: 'De baja',
    key: 'UNSUBSCRIBED',
    icon: <BellDisabledSVG size={ICON_SIZE} />,
  },
  {
    label: 'Rebotado',
    key: 'BOUNCED',
    icon: <EmailClosedSVG size={ICON_SIZE} />,
  },
]
