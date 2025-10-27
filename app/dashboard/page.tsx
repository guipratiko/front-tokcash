'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { 
  Sparkles, 
  Video, 
  TrendingUp, 
  Coins, 
  ArrowRight,
  Zap,
  Clock,
  Target
} from 'lucide-react'
import { api } from '@/lib/api'

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const result = await api.me()
      return (result.data as any)?.user
    },
  })

  const { data: balanceData } = useQuery({
    queryKey: ['credits', 'balance'],
    queryFn: async () => {
      const result = await api.getBalance()
      return (result.data as any)?.balance || 0
    },
  })

  const { data: trendsData } = useQuery({
    queryKey: ['trends'],
    queryFn: async () => {
      const result = await api.getTrends()
      return (result.data as any)?.trends || []
    },
  })

  const ContentWrapper = isMounted ? motion.div : 'div'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white relative">
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
      </div>
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <ContentWrapper
          {...(isMounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          })}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Olá, {user?.name ? user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase() : 'Criador'}!
          </h1>
          <p className="text-lg text-gray-600">
            Pronto para criar conteúdo viral hoje?
          </p>
        </ContentWrapper>

        {/* Low Credits Alert */}
        {balanceData !== undefined && balanceData < 5 && (
          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 }
            })}
          >
            <Card className="p-4 border-0 shadow-lg bg-gradient-to-r from-orange-100 to-red-100 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Créditos baixos!</p>
                    <p className="text-sm text-gray-700">Recarregue agora para continuar criando</p>
                  </div>
                </div>
                <Link href="/buy-credits">
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                    Assinar Plano
                  </Button>
                </Link>
              </div>
            </Card>
          </ContentWrapper>
        )}

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Credits Card */}
          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 }
            })}
          >
            <Card className="p-6 border-0 shadow-xl shadow-purple-200/50 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl">
                  <Coins className="h-8 w-8" />
                </div>
                <Badge className="bg-white/20 backdrop-blur-xl border-0 text-white">
                  Ativos
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-white/80 text-sm font-medium">Créditos Disponíveis</p>
                <p className="text-5xl font-bold">{balanceData || 0}</p>
                <p className="text-white/70 text-sm">1 crédito = 1 prompt</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <Link href="/buy-credits">
                  <Button variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                    <Coins className="h-4 w-4 mr-2" />
                    Assinar Plano Mensal
                  </Button>
                </Link>
              </div>
            </Card>
          </ContentWrapper>

          {/* Quick Actions */}
          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 }
            })}
            className="md:col-span-2"
          >
            <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-white h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/prompts/new">
                  <Button className="w-full h-full min-h-[80px] flex flex-col gap-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg">
                    <Sparkles className="h-6 w-6" />
                    <span className="font-semibold">Gerar Prompt</span>
                    <span className="text-xs opacity-90">1 crédito</span>
                  </Button>
                </Link>
                
                <Link href="/videos/new" className="block">
                  <Button className="w-full h-full min-h-[80px] flex flex-col gap-2 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg">
                    <Video className="h-6 w-6" />
                    <span className="font-semibold">Gerar Vídeo</span>
                    <span className="text-xs opacity-90">5 créditos</span>
                  </Button>
                </Link>
              </div>
            </Card>
          </ContentWrapper>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-3 gap-6">
          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 }
            })}
          >
            <Link href="/prompts">
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-2xl group-hover:bg-purple-200 transition-colors">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Meus Prompts</h3>
                <p className="text-sm text-gray-600">Ver todos os prompts gerados</p>
              </Card>
            </Link>
          </ContentWrapper>

          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 }
            })}
          >
            <Link href="/videos">
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-pink-100 rounded-2xl group-hover:bg-pink-200 transition-colors">
                    <Video className="h-6 w-6 text-pink-600" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Meus Vídeos</h3>
                <p className="text-sm text-gray-600">Ver todos os vídeos gerados</p>
              </Card>
            </Link>
          </ContentWrapper>

          <ContentWrapper
            {...(isMounted && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 }
            })}
          >
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Meta do Mês</h3>
              <p className="text-sm opacity-90">10 vídeos virais</p>
            </Card>
          </ContentWrapper>
        </div>

        {/* Trends Section */}
        <ContentWrapper
          {...(isMounted && {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.6 }
          })}
        >
          <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Trends da Semana</h2>
                  <p className="text-sm text-gray-600">Clique para usar no seu próximo vídeo</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-700 border-0">
                <Zap className="h-3 w-3 mr-1" />
                Quente
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendsData?.slice(0, 6).map((trend: any, i: number) => (
                <Link
                  key={trend._id}
                  href={`/prompts/new?trend=${trend._id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <Card className="p-4 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                          {trend.platform.toUpperCase()}
                        </Badge>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {trend.title}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {trend.keywords?.slice(0, 3).map((keyword: string) => (
                          <span
                            key={keyword}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </Card>
        </ContentWrapper>
      </main>

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
      `}</style>
    </div>
  )
}
