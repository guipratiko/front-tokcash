# 📸 Como Adicionar Imagens no TokCash

## 📂 Estrutura Criada

As pastas de imagens estão em:
```
frontend/public/images/
├── logos/        → Logos e variações
├── banners/      → Banners e imagens hero
├── icons/        → Ícones customizados
└── backgrounds/  → Texturas e fundos
```

## 🎨 Imagens Recomendadas para Adicionar

### 1. Logo Principal
**Arquivo:** `public/images/logos/logo.svg`
- Logo do TokCash em SVG
- Pode usar o ícone Sparkles atual ou criar logo customizado
- Cores: Gradiente roxo (#8B5CF6) para rosa (#EC4899)

### 2. Banner Hero
**Arquivo:** `public/images/banners/hero-banner.jpg`
- Imagem para hero section da landing page
- Tamanho: 1920x1080px
- Tema: Criador de conteúdo, vídeos, IA
- Exemplo: https://unsplash.com/s/photos/content-creator

### 3. Ícones dos Planos
**Arquivos:** `public/images/icons/plan-*.svg`
- plan-start.svg (ícone do plano START)
- plan-pro.svg (ícone do plano PRO) 
- plan-infinity.svg (ícone do plano INFINITY)

### 4. Background Pattern
**Arquivo:** `public/images/backgrounds/pattern.svg`
- Pattern sutil para usar como textura
- Exemplo: Grid, dots, ou geometric pattern

## 💻 Como Usar no Código

### Opção 1: Import Centralizado (Recomendado)

```tsx
import Image from 'next/image'
import { IMAGES } from '@/lib/image-paths'

<Image 
  src={IMAGES.logos.main}
  alt="TokCash Logo"
  width={200}
  height={50}
/>
```

### Opção 2: Path Direto

```tsx
import Image from 'next/image'

<Image 
  src="/images/logos/logo.svg"
  alt="TokCash Logo"
  width={200}
  height={50}
/>
```

### Opção 3: Background CSS

```tsx
<div 
  className="h-64 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/banners/hero-banner.jpg')" }}
>
  Conteúdo
</div>
```

## 🎯 Onde Adicionar Cada Imagem

### Landing Page (`app/page.tsx`)
Linha ~70: Adicionar logo no header
Linha ~90: Adicionar hero banner

```tsx
<Image 
  src="/images/banners/hero-banner.jpg"
  alt="Hero Banner"
  width={1920}
  height={1080}
  className="rounded-3xl"
/>
```

### Navbar (`components/navbar.tsx`)
Linha ~65: Substituir ícone Sparkles por logo

```tsx
<Image 
  src="/images/logos/logo-icon.svg"
  alt="TokCash"
  width={28}
  height={28}
/>
```

### Footer (`components/footer.tsx`)
Linha ~74: Adicionar logo

```tsx
<Image 
  src="/images/logos/logo.svg"
  alt="TokCash"
  width={120}
  height={30}
/>
```

### Planos (`app/buy-credits/page.tsx`)
Linhas ~130, ~190, ~250: Adicionar ícones dos planos

```tsx
<Image 
  src="/images/icons/plan-pro.svg"
  alt="Plano PRO"
  width={80}
  height={80}
/>
```

## 🖼️ Fontes de Imagens Gratuitas

- **Unsplash:** https://unsplash.com
- **Pexels:** https://pexels.com
- **Freepik:** https://freepik.com
- **SVG Backgrounds:** https://svgbackgrounds.com
- **Hero Patterns:** https://heropatterns.com

### Buscar por:
- "content creator"
- "video production"
- "social media"
- "ai technology"
- "modern gradient"

## ⚡ Otimização Automática

O Next.js otimiza automaticamente:
- ✅ Lazy loading
- ✅ Responsive sizes
- ✅ WebP/AVIF conversion
- ✅ Blur placeholder

## 📝 Checklist

- [ ] Logo principal (SVG)
- [ ] Logo variações (white, icon)
- [ ] Hero banner landing page
- [ ] Ícones dos 3 planos
- [ ] Background pattern (opcional)
- [ ] Favicon (adicionar em `app/`)

---

**Dica:** Sempre otimize imagens antes de adicionar para melhor performance!

