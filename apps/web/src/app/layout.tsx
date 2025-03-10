import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Cashmere Studio',
  description: 'Prenota una sessione a Cashmere Studio in via Oreste Salomonne a Milano',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href='/cashmere-logo.svg'  type="image/svg+xml"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  )
}
