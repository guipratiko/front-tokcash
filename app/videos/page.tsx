'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Video, Plus, Loader2, CheckCircle, AlertCircle, Clock, Play } from 'lucide-react'
import { api } from '@/lib/api'

export default function VideosPage() {
  const { data: videosData, isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const result = await api.getVideos()
      return (result.data as any)?.videos || []
    },
    refetchInterval: 5000,
  })

  const getStatusConfig = (status: string) => {
    const configs = {
      queued: {
        badge: <Badge className="bg-gray-100 text-gray-700 border-0">Na fila</Badge>,
        icon: <Clock className="h-5 w-5 text-gray-500" />,
        text: 'Aguardando processamento...'
      },
      processing: {
        badge: <Badge className="bg-blue-100 text-blue-700 border-0">Processando</Badge>,
        icon: <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />,
        text: 'Gerando seu vídeo...'
      },
      ready: {
        badge: <Badge className="bg-green-100 text-green-700 border-0">Pronto</Badge>,
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        text: 'Vídeo disponível'
      },
      failed: {
        badge: <Badge className="bg-red-100 text-red-700 border-0">Erro</Badge>,
        icon: <AlertCircle className="h-5 w-5 text-red-600" />,
        text: 'Falha ao processar'
      }
    }
    return configs[status as keyof typeof configs] || configs.queued
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white relative">
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
      </div>
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Meus Vídeos</h1>
            <p className="text-gray-600">Vídeos gerados com IA</p>
          </div>
          <Link href="/videos/new">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
              <Plus className="h-5 w-5 mr-2" />
              Novo Vídeo
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
          </div>
        ) : videosData?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-12 text-center border-0 shadow-xl shadow-gray-200/50 bg-white">
              <div className="inline-flex p-4 bg-purple-100 rounded-full mb-6">
                <Video className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Nenhum vídeo ainda
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Comece gerando seu primeiro vídeo viral com IA
              </p>
              <Link href="/videos/new">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Gerar Primeiro Vídeo
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosData?.map((video: any, i: number) => {
              const statusConfig = getStatusConfig(video.status)
              return (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      {statusConfig.icon}
                      {statusConfig.badge}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Vídeo #{video._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {new Date(video.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                      })}
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-700">{statusConfig.text}</p>
                    </div>

                    {video.status === 'ready' && video.assets?.videoUrl && (
                      <Button
                        variant="outline"
                        className="w-full border-2 border-green-300 hover:border-green-400 hover:bg-green-50 text-green-700"
                        asChild
                      >
                        <a href={video.assets.videoUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
                          Assistir Vídeo
                        </a>
                      </Button>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
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
