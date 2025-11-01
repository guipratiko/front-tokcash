import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'TokCash - Ganhe Dinheiro Postando Vídeos no TikTok',
    template: '%s | TokCash'
  },
  description: 'Ganhe de R$120 a R$460 por dia postando vídeos no TikTok. Crie roteiros, voz, legendas e vídeos completos automaticamente. Comece agora!',
  keywords: [
    'ganhar dinheiro',
    'tiktok',
    'vídeos virais',
    'criar vídeos',
    'geração de vídeos',
    'prompts virais',
    'renda extra',
    'monetização tiktok',
    'shorts',
    'reels',
    'conteúdo viral'
  ],
  authors: [{ name: 'TokCash' }],
  creator: 'TokCash',
  publisher: 'TokCash',
  metadataBase: new URL('https://www.tokcash.com.br'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logos/favicon.png',
    shortcut: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
  openGraph: {
    title: 'TokCash - Ganhe Dinheiro Postando Vídeos no TikTok',
    description: 'Ganhe de R$120 a R$460 por dia postando vídeos no TikTok. Crie roteiros, voz, legendas e vídeos completos automaticamente.',
    url: 'https://www.tokcash.com.br',
    siteName: 'TokCash',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/logos/LogoTokCash.png',
        width: 1200,
        height: 630,
        alt: 'TokCash - Ganhe Dinheiro com Vídeos',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TokCash - Ganhe Dinheiro Postando Vídeos no TikTok',
    description: 'Ganhe de R$120 a R$460 por dia postando vídeos no TikTok',
    images: ['/images/logos/LogoTokCash.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
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

