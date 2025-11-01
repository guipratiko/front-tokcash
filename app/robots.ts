import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.tokcash.com.br'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/dashboard/',
        '/prompts/',
        '/videos/',
        '/profile/',
        '/buy-credits/',
        '/auth/set-password',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

