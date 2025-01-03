import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ReactQueryClientProvider } from '@/lib/reactQuery'

const inter = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Administrador de ecommerce Accmovil',
  description:
    'Herramienta para el manejo de Ordenes, Productos, Clientes y gestiones de ofertas.',
  openGraph: {
    images: {
      url: 'https://media.oscarcarranza.dev/up/images/Administrador%20de_KM14WNd_720p.webp',
      alt: 'Herramienta digital.',
    },
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryClientProvider>
  )
}
