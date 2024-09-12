import AccessDenied from './accessDenied'
import NotFound from './notFound'

type TProps = {
  errorRef?: unknown
  message: string
}

export default function ErrorsPages({ errorRef, message }: TProps) {
  if (errorRef === 403) return <AccessDenied message={message} />
  return <NotFound message={message} />
}
