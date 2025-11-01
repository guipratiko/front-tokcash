import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dashboard/', '/prompts/', '/videos/', '/profile/', '/buy-credits/'],
    },
    sitemap: 'https://www.tokcash.com.br/sitemap.xml',
  }
}
