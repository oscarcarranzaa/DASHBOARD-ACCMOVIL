import { ThemeProvider, useTheme } from 'next-themes'
import { NextUIProvider } from '@nextui-org/system'
import NavegationLayout from '@/components/navegationLayout'
import { Toaster } from 'sonner'

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NextUIProvider>
        <ThemeProvider attribute="class">
          <NavegationLayout>
            <main className="flex justify-center w-full">
              <div className=" max-w-[130rem] p-5 2xl:ml-10 2xl:mr-10 w-full">
                {children}
              </div>
              <Toaster theme="dark" richColors />
            </main>
          </NavegationLayout>
        </ThemeProvider>
      </NextUIProvider>
    </>
  )
}
