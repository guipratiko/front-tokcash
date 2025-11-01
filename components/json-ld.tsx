export function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TokCash',
  url: 'https://www.tokcash.com.br',
  logo: 'https://www.tokcash.com.br/images/logos/LogoTokCash.png',
  description: 'Plataforma para ganhar dinheiro postando vídeos no TikTok',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: 'Portuguese',
  },
  sameAs: [
    'https://instagram.com/tokcash',
    'https://youtube.com/tokcash',
    'https://twitter.com/tokcash',
  ],
}

export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'TokCash - Plano Premium',
  description: 'Ganhe dinheiro postando vídeos no TikTok com ferramentas profissionais',
  brand: {
    '@type': 'Brand',
    name: 'TokCash',
  },
  offers: {
    '@type': 'Offer',
    price: '97.00',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    url: 'https://checkout.perfectpay.com.br/pay/PPU38CQ2L0K',
  },
}

export const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TokCash',
  url: 'https://www.tokcash.com.br',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '97.00',
    priceCurrency: 'BRL',
  },
  description: 'Ganhe de R$120 a R$460 por dia postando vídeos no TikTok',
}

