import NavegationLayout from '@/components/navegationLayout'
import { Providers } from '@/providers'
import { cookies } from 'next/headers'

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const openMenu = cookieStore.get('openMenu')
  const isOpenMenu = openMenu?.value === 'true'
  return (
    <Providers>
      <NavegationLayout isOpenMenu={isOpenMenu}>
        <main className="flex-none block">
          <div className="px-5 pt-5 max-w-[1700px] h-full w-full ">
            {children}
          </div>
        </main>
      </NavegationLayout>
    </Providers>
  )
}
