export default function HeaderUI({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className=" bg-slate-300 w-full rounded-md p-2 mb-10 mt-5 dark:bg-zinc-700">
        <div>{children}</div>
      </header>
    </>
  )
}
