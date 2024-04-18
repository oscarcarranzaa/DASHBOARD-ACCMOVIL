import SideMenu from '@/components/sideMenu'

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="bg-slate-100 flex">
        <SideMenu />
        <main>{children}</main>
      </div>
    </>
  )
}
