'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Footer } from '@/components/footer'
import { Sparkles, Video, TrendingUp, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react'

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const ContentWrapper = isMounted ? motion.div : 'div'
  const SectionWrapper = isMounted ? motion.section : 'section'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/50 to-white">
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-6000" />
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-gray-200/50 backdrop-blur-xl bg-white/80 shadow-lg shadow-purple-100/50' 
          : 'border-white/20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-1">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <ContentWrapper 
                {...(isMounted && {
                  whileHover: { scale: 1.05 }
                })}
              >
                <Image 
                  src="/images/logos/LogoTokCash.png" 
                  alt="TokCash" 
                  width={240} 
                  height={80}
                  className="h-20 w-auto"
                />
              </ContentWrapper>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-700">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <ContentWrapper
          {...(isMounted && {
            variants: containerVariants,
            initial: "hidden",
            animate: "visible"
          })}
          className="text-center space-y-8"
        >
          <ContentWrapper {...(isMounted && { variants: itemVariants })}>
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0 px-4 py-2 text-sm font-medium">
              <Zap className="h-3 w-3 mr-1 inline" />
              IA para Criadores de Conteudo
            </Badge>
          </ContentWrapper>

          <ContentWrapper 
            {...(isMounted && { variants: itemVariants })}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Vídeos Virais
            </span>
            <br />
            <span className="text-gray-900">em segundos</span>
          </ContentWrapper>

          <ContentWrapper 
            {...(isMounted && { variants: itemVariants })}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Gere prompts otimizados e videos prontos com IA.<br />
            <span className="font-semibold text-gray-900">De ideia a viral em minutos.</span>
          </ContentWrapper>

          <ContentWrapper 
            {...(isMounted && { variants: itemVariants })}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="/auth/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/40 transition-all"
              >
                Começar Agora - Grátis
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-2xl border-2 border-gray-300 hover:border-purple-300 hover:bg-purple-50/50"
              >
                Ver Como Funciona
              </Button>
            </Link>
          </ContentWrapper>

          <ContentWrapper 
            {...(isMounted && { variants: itemVariants })}
            className="pt-8 flex items-center justify-center gap-8 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Cancele quando quiser
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Créditos acumulam
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Pagamento seguro
            </div>
          </ContentWrapper>
        </ContentWrapper>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <ContentWrapper
          {...(isMounted && {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 }
          })}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-xl text-gray-600">
            Ferramentas profissionais ao alcance de um clique
          </p>
        </ContentWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Video,
              title: 'Geração de Vídeos',
              description: 'Em Desenvolvimento - IA cria roteiro, voz, legendas e vídeo completo automaticamente',
              gradient: 'from-gray-400 to-gray-500'
            },
            {
              icon: TrendingUp,
              title: 'Trends em Tempo Real',
              description: 'Acesse as últimas tendências do TikTok, Shorts e Reels',
              gradient: 'from-pink-500 to-pink-600'
            },
            {
              icon: Sparkles,
              title: 'Prompts Otimizados',
              description: 'Templates profissionais que maximizam engajamento',
              gradient: 'from-blue-500 to-blue-600'
            }
          ].map((feature, i) => (
            <ContentWrapper
              key={i}
              {...(isMounted && {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.1, duration: 0.5 },
                whileHover: { y: -8, transition: { duration: 0.2 } }
              })}
            >
              <Card className="p-8 border-0 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </ContentWrapper>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <ContentWrapper
          {...(isMounted && {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true }
          })}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h2>
          <p className="text-xl text-gray-600">
            Pague apenas pelos créditos que usar
          </p>
        </ContentWrapper>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* START */}
          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              whileHover: { y: -8, scale: 1.02 },
              transition: { duration: 0.3 }
            })}
          >
            <Card className="p-8 border-2 border-gray-200 hover:border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">START</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-bold text-gray-900">R$97</span>
                  <span className="text-xl text-gray-600">/mês</span>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0">
                  15 créditos/mês
                </Badge>
              </div>

              <ul className="space-y-4 mb-8">
                {['Geração de prompts', 'Trends semanais', 'Templates virais', 'Suporte básico'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/auth/register" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl shadow-lg">
                  Começar Agora
                </Button>
              </Link>
            </Card>
          </ContentWrapper>

          {/* PRO - Destaque */}
          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              whileHover: { y: -12, scale: 1.03 },
              transition: { duration: 0.3 }
            })}
            className="relative"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg">
                <Star className="h-3 w-3 mr-1 inline" />
                MAIS POPULAR
              </Badge>
            </div>

            <Card className="p-8 border-2 border-purple-400 shadow-2xl bg-gradient-to-b from-white to-purple-50 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">PRO</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    R$197
                  </span>
                  <span className="text-xl text-gray-600">/mês</span>
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-0">
                  30 créditos/mês
                </Badge>
              </div>

              <ul className="space-y-4 mb-8">
                {['Tudo do START +', 'Vídeos prontos com IA', 'Edição automática', 'Relatórios de performance', 'Suporte prioritário'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className={i === 0 ? 'font-semibold' : ''}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/register" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl shadow-xl shadow-purple-500/30">
                  Começar com PRO
                </Button>
              </Link>
            </Card>
          </ContentWrapper>

          {/* INFINITY */}
          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              whileHover: { y: -8, scale: 1.02 },
              transition: { duration: 0.3 }
            })}
          >
            <Card className="p-8 border-2 border-gray-200 hover:border-pink-300 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">INFINITY</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-bold text-gray-900">R$497</span>
                  <span className="text-xl text-gray-600">/mês</span>
                </div>
                <Badge className="bg-red-100 text-red-700 border-0">
                  100 créditos/mês
                </Badge>
              </div>

              <ul className="space-y-4 mb-8">
                {['Tudo do PRO +', 'Consultoria exclusiva', 'Acesso antecipado', 'API personalizada', 'Suporte VIP 24/7'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className={i === 0 ? 'font-semibold' : ''}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/register" className="block">
                <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-6 rounded-xl shadow-lg">
                  Escalar Agora
                </Button>
              </Link>
            </Card>
          </ContentWrapper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <ContentWrapper
          {...(isMounted && {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true }
          })}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl shadow-purple-500/30"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para viralizar?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já estão gerando conteúdo viral com IA
          </p>
          <Link href="/auth/register">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-50 text-lg px-8 py-6 rounded-2xl shadow-xl"
            >
              Começar Grátis Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </ContentWrapper>
      </section>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.85); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  )
}
