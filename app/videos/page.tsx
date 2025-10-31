'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Video, Plus, Copy, CheckCircle, Calendar, Loader2, AlertCircle, Trash2, ExternalLink, Download } from 'lucide-react'
import { api } from '@/lib/api'
import { useState } from 'react'

// Helper para verificar se uma URL é de vídeo
function isVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.flv', '.wmv', '.m4v']
  const urlLower = url.toLowerCase()
  return videoExtensions.some(ext => urlLower.includes(ext)) || 
         urlLower.includes('/video/') || 
         urlLower.includes('video=')
}

// Helper para parsear a resposta e extrair informações
function parseVideoResponse(resultText: string) {
  // Extrair links diretos (http/https)
  const urlRegex = /(https?:\/\/[^\s]+)/g
  
  // Extrair links markdown
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  
  const links: Array<{ text: string; url: string }> = []
  let videoUrl: string | null = null
  
  // Primeiro, tenta parsear como JSON
  try {
    const parsed = JSON.parse(resultText)
    if (Array.isArray(parsed) && parsed[0]?.output) {
      const output = parsed[0].output
      
      // Extrair links markdown
      let match
      while ((match = markdownLinkRegex.exec(output)) !== null) {
        links.push({ text: match[1], url: match[2] })
      }
      
      // Extrair URLs diretas (se não houver markdown)
      if (links.length === 0) {
        while ((match = urlRegex.exec(output)) !== null) {
          const url = match[1]
          links.push({ text: 'Assistir Vídeo', url })
        }
      }
      
      // Verificar se é URL de vídeo
      const allUrls = links.map(l => l.url).concat(output.match(urlRegex) || [])
      videoUrl = allUrls.find(url => isVideoUrl(url)) || null
      
      return {
        formattedText: output,
        links,
        hasLinks: links.length > 0,
        isDirectLink: links.length === 1 && output.trim().startsWith('http'),
        videoUrl: videoUrl || (links.length === 1 && isVideoUrl(links[0].url) ? links[0].url : null)
      }
    }
  } catch (e) {
    // Não é JSON válido
  }
  
  // Extrair links do texto original
  let match
  while ((match = markdownLinkRegex.exec(resultText)) !== null) {
    links.push({ text: match[1], url: match[2] })
  }
  
  // Se não tiver markdown, buscar URLs diretas
  if (links.length === 0) {
    while ((match = urlRegex.exec(resultText)) !== null) {
      const url = match[1]
      links.push({ text: 'Assistir Vídeo', url })
    }
  }
  
  // Verificar se é URL de vídeo
  const allUrls = links.map(l => l.url).concat(resultText.match(urlRegex) || [])
  videoUrl = allUrls.find(url => isVideoUrl(url)) || null
  
  // Se não encontrou vídeo nos links e o texto é uma URL direta, verificar se é vídeo
  if (!videoUrl && resultText.trim().startsWith('http')) {
    const trimmedUrl = resultText.trim()
    if (isVideoUrl(trimmedUrl)) {
      videoUrl = trimmedUrl
    }
  }
  
  return {
    formattedText: resultText,
    links,
    hasLinks: links.length > 0,
    isDirectLink: links.length === 1 && resultText.trim().startsWith('http'),
    videoUrl: videoUrl || (links.length === 1 && isVideoUrl(links[0].url) ? links[0].url : null)
  }
}

export default function VideosPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: videosData, isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const result = await api.getVideos()
      return (result.data as any)?.videos || []
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await api.deleteVideo(id)
      if (result.error) throw new Error(result.error)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      setDeletingId(null)
    },
    onError: (error: Error) => {
      alert(`Erro ao deletar vídeo: ${error.message}`)
      setDeletingId(null)
    },
  })

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este vídeo?')) {
      setDeletingId(id)
      deleteMutation.mutate(id)
    }
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Meus Vídeos</h1>
            <p className="text-gray-600">Histórico de vídeos gerados com IA</p>
          </div>
          <Link href="/videos/new">
            <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg">
              <Plus className="h-5 w-5 mr-2" />
              Novo Vídeo
            </Button>
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
          </div>
        ) : videosData?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-12 text-center border-0 shadow-xl shadow-gray-200/50 bg-white">
              <div className="inline-flex p-4 bg-pink-100 rounded-full mb-6">
                <Video className="h-12 w-12 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Nenhum vídeo ainda
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Comece gerando seu primeiro vídeo viral com IA
              </p>
              <Link href="/videos/new">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                  Gerar Primeiro Vídeo
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {videosData?.map((video: any, i: number) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {video.inputBrief?.nicho || 'Vídeo'}
                        </h3>
                        {video.status === 'processing' && (
                          <Badge className="bg-blue-100 text-blue-700 border-0 flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Processando
                          </Badge>
                        )}
                        {video.status === 'failed' && (
                          <Badge className="bg-red-100 text-red-700 border-0 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Falhou
                          </Badge>
                        )}
                        {video.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-700 border-0 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Concluído
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(video.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {video.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(video.resultText, video._id)}
                          className="hover:bg-pink-50 hover:text-pink-600"
                        >
                          {copiedId === video._id ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(video._id)}
                        disabled={deletingId === video._id}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        {deletingId === video._id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Detalhes do Vídeo */}
                  {video.inputBrief && (
                    <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                      {video.inputBrief.duracao && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium">⏱️ Duração:</span>
                          <span>{video.inputBrief.duracao}</span>
                        </div>
                      )}
                      {video.inputBrief.estilo && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium">🎨 Estilo:</span>
                          <span>{video.inputBrief.estilo}</span>
                        </div>
                      )}
                      {video.inputBrief.cta && (
                        <div className="col-span-2 flex items-center gap-2 text-gray-600">
                          <span className="font-medium">📢 CTA:</span>
                          <span className="truncate">{video.inputBrief.cta}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {video.status === 'processing' ? (
                    <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-6 mb-4 text-center border border-blue-100">
                      <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Aguardando geração pela IA...
                      </p>
                    </div>
                  ) : video.status === 'failed' ? (
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 mb-4 border border-red-100">
                      <p className="text-sm text-red-700">
                        {video.resultText || 'Erro ao gerar vídeo. Tente novamente.'}
                      </p>
                    </div>
                  ) : (
                    (() => {
                      const parsed = parseVideoResponse(video.resultText || '')
                      const videoUrl = parsed.videoUrl || (parsed.isDirectLink ? parsed.links[0]?.url : null)
                      
                      // Se for uma URL de vídeo, mostrar player
                      if (videoUrl && isVideoUrl(videoUrl)) {
                        return (
                          <div className="mb-4 space-y-3">
                            {/* Player de Vídeo */}
                            <div className="rounded-xl overflow-hidden bg-black shadow-lg">
                              <video
                                controls
                                className="w-full h-auto max-h-64"
                                src={videoUrl}
                                preload="metadata"
                              >
                                Seu navegador não suporta a tag de vídeo.
                              </video>
                            </div>
                            
                            {/* Botões de ação */}
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const link = document.createElement('a')
                                  link.href = videoUrl!
                                  link.download = `video-${video._id}.mp4`
                                  document.body.appendChild(link)
                                  link.click()
                                  document.body.removeChild(link)
                                }}
                                className="flex-1 border-2 border-green-300 hover:border-green-400 hover:bg-green-50 text-green-700"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopy(videoUrl, video._id)}
                                className="flex-1 border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50"
                              >
                                {copiedId === video._id ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copiar
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        )
                      }
                      
                      // Se for apenas um link direto, mostrar só o botão
                      if (parsed.isDirectLink) {
                        return (
                          <div className="mb-4">
                            <Button
                              size="lg"
                              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
                              asChild
                            >
                              <a href={parsed.links[0]?.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-5 w-5 mr-2" />
                                {parsed.links[0]?.text || 'Assistir Vídeo'}
                              </a>
                            </Button>
                          </div>
                        )
                      }
                      
                      // Remove links markdown do texto
                      const cleanText = parsed.formattedText
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '')
                        .replace(/(https?:\/\/[^\s]+)/g, '')
                        .trim()
                      
                      return (
                        <div className="space-y-4 mb-4">
                          {cleanText && (
                            <div className="bg-gradient-to-br from-gray-50 to-pink-50/30 rounded-xl p-4 max-h-40 overflow-y-auto border border-gray-100">
                              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                                {cleanText}
                              </pre>
                            </div>
                          )}
                          
                          {parsed.hasLinks && (
                            <div className="flex flex-wrap gap-2">
                              {parsed.links.map((link, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  asChild
                                  className="border-2 border-pink-300 hover:border-pink-400 hover:bg-pink-50 text-pink-700"
                                >
                                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    {link.text}
                                  </a>
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })()
                  )}

                  {video.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          className="bg-pink-100 text-pink-700 border-0 hover:bg-pink-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
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

