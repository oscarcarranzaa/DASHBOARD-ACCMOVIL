export default function ErrorsMessage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="ml-1">
      <p className="text-danger mt-1 text-xs font-semibold inline-block">
        {children}
      </p>
    </div>
  )
}
