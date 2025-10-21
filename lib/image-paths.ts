/**
 * Caminhos centralizados para imagens do TokCash
 * 
 * Uso:
 * import { IMAGES } from '@/lib/image-paths'
 * <Image src={IMAGES.logos.main} alt="Logo" />
 */

export const IMAGES = {
  logos: {
    main: '/images/logos/logo.svg',
    white: '/images/logos/logo-white.svg',
    icon: '/images/logos/logo-icon.svg',
    full: '/images/logos/logo-full.png',
  },
  banners: {
    hero: '/images/banners/hero-banner.jpg',
    dashboard: '/images/banners/dashboard-banner.jpg',
    promo: '/images/banners/promo-banner.jpg',
  },
  icons: {
    planStart: '/images/icons/plan-start.svg',
    planPro: '/images/icons/plan-pro.svg',
    planInfinity: '/images/icons/plan-infinity.svg',
  },
  backgrounds: {
    gradient1: '/images/backgrounds/gradient-1.jpg',
    gradient2: '/images/backgrounds/gradient-2.jpg',
    pattern: '/images/backgrounds/pattern.svg',
  },
} as const

/**
 * Helper para gerar srcset responsivo
 */
export function getResponsiveImage(basePath: string) {
  return {
    src: basePath,
    srcSet: `${basePath} 1x, ${basePath.replace('.', '@2x.')} 2x`,
  }
}

