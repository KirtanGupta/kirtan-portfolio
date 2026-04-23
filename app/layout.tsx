import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kirtan Gupta | Full Stack Developer',
  description: 'Portfolio of Kirtan Jagdish Gupta — Full Stack Developer from Mumbai.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}