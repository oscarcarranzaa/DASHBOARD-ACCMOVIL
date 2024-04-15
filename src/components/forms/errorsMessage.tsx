export default function ErrorsMessage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="ml-1">
      <p className="text-red-400 mt-1 text-sm font-medium inline-block">
        {children}
      </p>
    </div>
  )
}
