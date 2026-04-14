import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LearnCraft - Forelle Quest',
  description: 'Lerne alles über die Forelle!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100">
          {children}
        </main>
      </body>
    </html>
  )
}
