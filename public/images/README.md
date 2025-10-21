# 🖼️ Estrutura de Imagens - TokCash

Esta pasta contém todos os assets visuais do TokCash.

## 📁 Estrutura de Pastas

```
public/images/
├── logos/           # Logos e variações
│   ├── logo.svg            # Logo principal
│   ├── logo-white.svg      # Logo para fundos escuros
│   ├── logo-icon.svg       # Ícone sem texto
│   └── logo-full.png       # Logo completa em PNG
│
├── banners/         # Banners e imagens hero
│   ├── hero-banner.jpg     # Banner da landing page
│   ├── dashboard-banner.jpg # Banner do dashboard
│   └── promo-banner.jpg    # Banner promocional
│
├── icons/           # Ícones customizados
│   ├── plan-start.svg      # Ícone plano START
│   ├── plan-pro.svg        # Ícone plano PRO
│   ├── plan-infinity.svg   # Ícone plano INFINITY
│   └── features/           # Ícones de features
│
└── backgrounds/     # Texturas e backgrounds
    ├── gradient-1.jpg      # Gradiente roxo-rosa
    ├── gradient-2.jpg      # Gradiente azul-roxo
    └── pattern.svg         # Pattern decorativo
```

## 🎨 Como Usar

### No Next.js (import estático):

```tsx
import Image from 'next/image'
import logo from '@/public/images/logos/logo.svg'

<Image 
  src={logo}
  alt="TokCash Logo"
  width={200}
  height={50}
/>
```

### Via URL (path público):

```tsx
import Image from 'next/image'

<Image 
  src="/images/logos/logo.svg"
  alt="TokCash Logo"
  width={200}
  height={50}
/>
```

### Como background CSS:

```tsx
<div style={{ backgroundImage: "url('/images/backgrounds/gradient-1.jpg')" }}>
  Conteúdo
</div>
```

## 📐 Especificações Recomendadas

### Logos
- Formato: SVG (vetorial, escalável)
- Alternativa: PNG com fundo transparente
- Tamanho mínimo: 512x512px (para PNG)

### Banners
- Formato: JPG ou WebP (otimizado)
- Hero banner: 1920x1080px
- Banners menores: 1200x600px
- Compressão: 80-90% qualidade

### Ícones
- Formato: SVG (preferencial)
- Alternativa: PNG 256x256px
- Fundo transparente

### Backgrounds
- Formato: JPG ou WebP
- Tamanho: 1920x1080px ou maior
- Otimizado para web (< 200KB)

## 🚀 Otimização

### Comprimir imagens antes de adicionar:

```bash
# PNG
pngquant --quality=65-80 image.png

# JPG
jpegoptim --max=85 image.jpg

# WebP (recomendado)
cwebp -q 80 image.jpg -o image.webp
```

### Next.js otimiza automaticamente:
- Lazy loading
- Responsive images
- Modern formats (WebP, AVIF)

## 📝 Notas

- Sempre use o componente `<Image>` do Next.js
- Adicione `alt` text descritivo em todas as imagens
- Prefira SVG para logos e ícones
- Use WebP para fotos e banners
- Mantenha imagens < 500KB quando possível
- Use nomes descritivos em kebab-case

## 🎨 Palette de Cores (para referência)

- **Roxo Primary:** #8B5CF6
- **Rosa Accent:** #EC4899
- **Azul Secondary:** #3B82F6
- **Verde Success:** #10B981
- **Vermelho Alert:** #EF4444
- **Laranja Warn:** #F59E0B

---

**Desenvolvido com 💜 pela equipe TokCash**

