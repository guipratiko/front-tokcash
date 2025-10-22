import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TokCash - Geracao de Prompts e Videos Virais com IA',
  description: 'Plataforma para geracao de prompts de videos virais e videos prontos com IA',
  icons: {
    icon: '/images/logos/favicon.png',
    shortcut: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="bg-white" suppressHydrationWarning>
      <body className={`${inter.className} bg-white`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

