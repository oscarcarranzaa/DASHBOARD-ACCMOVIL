import Link from 'next/link'

type TProps = {
  text: string
  url?: string
  label?: string
}
export default function ToastInfo({ text, url, label }: TProps) {
  return (
    <>
      <div>
        <p className="text-zinc-700  font-semibold">{text}</p>
        {url && label ? (
          <p>
            <Link href={url} className="text-blue-700 text-sm underline">
              {label}
            </Link>
          </p>
        ) : null}
      </div>
    </>
  )
}
