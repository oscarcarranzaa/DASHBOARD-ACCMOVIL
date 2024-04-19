import Header from '@/components/header'
import SideMenu from '@/components/sideMenu'

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <div className="bg-gray-100 flex">
        <SideMenu />
        <main>{children}</main>
      </div>
    </>
  )
}
