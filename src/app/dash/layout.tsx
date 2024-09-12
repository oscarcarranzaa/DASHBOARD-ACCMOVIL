import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/system'
import Header from '@/components/header'
import SideMenu from '@/components/sideMenu'

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NextUIProvider>
        <ThemeProvider attribute="class">
          <Header />
          <div className="bg-zinc-50 dark:bg-zinc-900 flex">
            <SideMenu />

            <main className="flex justify-center w-full">
              <div className=" max-w-[130rem] p-5 2xl:ml-10 2xl:mr-10 w-full">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </NextUIProvider>
    </>
  )
}
