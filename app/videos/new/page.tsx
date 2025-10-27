'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Video, Copy, CheckCircle, Wand2, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import { api } from '@/lib/api'

// Helper para parsear a resposta e extrair informações
function parseVideoResponse(resultText: string) {
  // Extrair links diretos (http/https)
  const urlRegex = /(https?:\/\/[^\s]+)/g
  
  // Extrair links markdown
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  
  const links: Array<{ text: string; url: string }> = []
  
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
      
      return {
        formattedText: output,
        links,
        hasLinks: links.length > 0,
        isDirectLink: links.length === 1 && output.trim().startsWith('http')
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
  
  return {
    formattedText: resultText,
    links,
    hasLinks: links.length > 0,
    isDirectLink: links.length === 1 && resultText.trim().startsWith('http')
  }
}

export default function NewVideoPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nicho: '',
    objetivo: '',
    cta: '',
    duracao: '30s',
    estilo: '',
    persona: '',
  })

  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const result = await api.generateVideo(data)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    onSuccess: (data: any) => {
      const video = data?.video
      if (video) {
        setVideoId(video._id)
        setStatus(video.status)
        if (video.status === 'completed') {
          setResult(video.resultText)
        }
      }
    },
  })

  // Polling para verificar status do vídeo
  useEffect(() => {
    if (videoId && status === 'processing') {
      const interval = setInterval(async () => {
        try {
          const result = await api.getVideo(videoId)
          if (result.data?.video) {
            const video = result.data.video
            setStatus(video.status)
            if (video.status === 'completed') {
              setResult(video.resultText)
              clearInterval(interval)
            } else if (video.status === 'failed') {
              setResult(video.resultText || 'Erro ao gerar vídeo. Tente novamente.')
              clearInterval(interval)
            }
          }
        } catch (error) {
          console.error('Erro ao verificar status do vídeo:', error)
        }
      }, 3000) // Verifica a cada 3 segundos

      return () => clearInterval(interval)
    }
  }, [videoId, status])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateMutation.mutate(formData)
  }

  const handleCopy = () => {
    if (result) {
      const parsed = parseVideoResponse(result)
      // Se houver link, copiar o link. Senão, copiar o texto completo
      const textToCopy = parsed.hasLinks ? parsed.links[0]?.url || result : result
      navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Gerar Vídeo Viral</h1>
          </div>
          <div className="text-gray-600 flex items-center gap-2">
            <Badge className="bg-pink-100 text-pink-700 border-0">5 créditos</Badge>
            Preencha os campos e deixe a IA criar o vídeo perfeito
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Informações do Vídeo</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nicho" className="text-gray-700 font-medium">
                  Nicho / Tema *
                </Label>
                <Input
                  id="nicho"
                  placeholder="Ex: Finanças, Fitness, Tecnologia..."
                  required
                  value={formData.nicho}
                  onChange={(e) => setFormData({ ...formData, nicho: e.target.value })}
                  className="h-12 border-gray-300 focus:border-pink-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivo" className="text-gray-700 font-medium">
                  Objetivo do vídeo *
                </Label>
                <Textarea
                  id="objetivo"
                  placeholder="Ex: Ensinar a economizar 30% da renda mensal"
                  required
                  rows={3}
                  value={formData.objetivo}
                  onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                  className="border-gray-300 focus:border-pink-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta" className="text-gray-700 font-medium">
                  Call to Action
                </Label>
                <Input
                  id="cta"
                  placeholder="Ex: Salve este vídeo!"
                  value={formData.cta}
                  onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                  className="h-12 border-gray-300 focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duracao" className="text-gray-700 font-medium">
                    Duração
                  </Label>
                  <select
                    id="duracao"
                    value={formData.duracao}
                    onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                    className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="15s">15 segundos</option>
                    <option value="30s">30 segundos</option>
                    <option value="60s">60 segundos</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estilo" className="text-gray-700 font-medium">
                    Estilo
                  </Label>
                  <Input
                    id="estilo"
                    placeholder="Ex: Dinâmico..."
                    value={formData.estilo}
                    onChange={(e) => setFormData({ ...formData, estilo: e.target.value })}
                    className="h-12 border-gray-300 focus:border-pink-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={generateMutation.isPending}
                className="w-full h-12 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
              >
                {generateMutation.isPending ? (
                  <>Gerando...</>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-2" />
                    Gerar Vídeo com IA
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Result */}
          <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Resultado</h2>

            {generateMutation.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                {(generateMutation.error as Error).message}
              </div>
            )}

            {status === 'processing' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="relative">
                  <div className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-4">
                    <Loader2 className="h-12 w-12 text-pink-600 animate-spin" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gerando vídeo com IA...
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Aguarde enquanto nossa IA cria o vídeo perfeito para você. Isso pode levar alguns minutos.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-pink-600">
                  <div className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"></div>
                  <span>Processando...</span>
                </div>
              </motion.div>
            ) : status === 'failed' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="p-4 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Erro ao gerar vídeo
                </h3>
                <p className="text-gray-600 max-w-sm mb-4">
                  {result || 'Não foi possível gerar o vídeo. Tente novamente.'}
                </p>
                <Button
                  onClick={() => {
                    setStatus('idle')
                    setResult(null)
                    setVideoId(null)
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Tentar Novamente
                </Button>
              </motion.div>
            ) : result && status === 'completed' ? (
              (() => {
                const parsed = parseVideoResponse(result)
                
                // Se for apenas um link direto, mostrar só o botão grande e bonito
                if (parsed.isDirectLink) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 text-center">
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Vídeo Gerado com Sucesso!</h3>
                        <p className="text-gray-600 mb-6">Seu vídeo está pronto para ser assistido</p>
                        
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl"
                          asChild
                        >
                          <a href={parsed.links[0]?.url} target="_blank" rel="noopener noreferrer">
                            <Video className="h-6 w-6 mr-3" />
                            Assistir Vídeo
                            <ExternalLink className="h-5 w-5 ml-3" />
                          </a>
                        </Button>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={handleCopy}
                          className="flex-1 border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50"
                        >
                          {copied ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copiar Link
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => router.push('/videos')}
                          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                        >
                          Ver Todos
                        </Button>
                      </div>
                    </motion.div>
                  )
                }
                
                // Remove links markdown e URLs do texto
                const cleanText = parsed.formattedText
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '')
                  .replace(/(https?:\/\/[^\s]+)/g, '')
                  .trim()
                
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    {cleanText && (
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
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

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={handleCopy}
                        className="flex-1 border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => router.push('/videos')}
                        className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                      >
                        Ver Todos
                      </Button>
                    </div>
                  </motion.div>
                )
              })()
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <Video className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  Preencha o formulário e clique em gerar
                </p>
              </div>
            )}
          </Card>
        </div>
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

