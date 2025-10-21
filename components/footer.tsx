'use client'

import Link from 'next/link'
import { Sparkles, Mail, Instagram, Youtube, Twitter, Github } from 'lucide-react'

export function Footer() {
  const footerSections = [
    {
      title: 'Produto',
      links: [
        { name: 'Funcionalidades', href: '#features' },
        { name: 'Preços', href: '#pricing' },
        { name: 'Planos', href: '/buy-credits' },
        { name: 'Como Funciona', href: '#' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Gerar Prompts', href: '/prompts/new' },
        { name: 'Gerar Vídeos', href: '/videos/new' },
        { name: 'Trends', href: '/dashboard' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Central de Ajuda', href: '#' },
        { name: 'Documentação', href: '#' },
        { name: 'Status', href: '#' },
        { name: 'Contato', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Termos de Uso', href: '#' },
        { name: 'Política de Privacidade', href: '#' },
        { name: 'Cookies', href: '#' },
        { name: 'Licenças', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/tokcash', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/tokcash', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com/tokcash', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/tokcash', label: 'GitHub' },
  ]

  return (
    <footer className="relative z-10 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-7 w-7 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                TokCash
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-6 max-w-xs leading-relaxed">
              Plataforma de geração de prompts e vídeos virais com inteligência artificial. 
              Crie conteúdo de alta qualidade em minutos.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-gray-900 mb-2">
              Fique por dentro das novidades
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Receba dicas, trends e atualizações direto no seu email
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
                />
              </div>
              <button className="px-6 h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium text-sm shadow-lg transition-all">
                Assinar
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <p className="text-sm text-gray-600">
                © 2025 TokCash. Todos os direitos reservados.
              </p>
              
              {/* Clerky Badge */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Engine by</span>
                <a 
                  href="https://clerky.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all group"
                >
                  <img 
                    src="/images/logos/Clerky.png" 
                    alt="Clerky" 
                    className="h-4 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-gray-700">Clerky</span>
                    <span className="text-[10px] text-gray-500">Hub WhatsApp com API</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-purple-600 transition-colors">
                Status
              </Link>
              <Link href="#" className="hover:text-purple-600 transition-colors">
                API
              </Link>
              <Link href="#" className="hover:text-purple-600 transition-colors">
                Blog
              </Link>
              <Link href="#" className="hover:text-purple-600 transition-colors">
                Afiliados
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
    </footer>
  )
}

