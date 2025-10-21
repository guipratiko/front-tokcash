'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Video, Film, AlertCircle, Sparkles, ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'

export default function NewVideoPage() {
  const router = useRouter()
  const [selectedPromptId, setSelectedPromptId] = useState('')
  const [textContent, setTextContent] = useState('')

  const { data: promptsData } = useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const result = await api.getPrompts()
      return (result.data as any)?.prompts || []
    },
  })

  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const result = await api.generateVideo(data)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    onSuccess: () => {
      router.push('/videos')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data: any = {}
    if (selectedPromptId) {
      data.promptId = selectedPromptId
    }
    if (textContent) {
      data.textContent = textContent
    }

    generateMutation.mutate(data)
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

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Gerar Vídeo com IA</h1>
          </div>
          <div className="text-gray-600 flex items-center gap-2">
            <Badge className="bg-pink-100 text-pink-700 border-0">5 créditos</Badge>
            Geração completa: roteiro, voz, legendas e vídeo
          </div>
        </div>

        <Card className="p-8 border-0 shadow-2xl shadow-gray-300/50 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {generateMutation.error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{(generateMutation.error as Error).message}</span>
              </motion.div>
            )}

            <div className="space-y-3">
              <Label htmlFor="prompt" className="text-gray-900 font-semibold text-lg">
                Escolha um prompt existente
              </Label>
              <select
                id="prompt"
                value={selectedPromptId}
                onChange={(e) => setSelectedPromptId(e.target.value)}
                className="flex h-12 w-full rounded-xl border-2 border-gray-300 bg-white px-4 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Selecione um prompt da sua biblioteca</option>
                {promptsData?.map((prompt: any) => (
                  <option key={prompt._id} value={prompt._id}>
                    {prompt.inputBrief?.nicho || 'Prompt'} -{' '}
                    {new Date(prompt.createdAt).toLocaleDateString('pt-BR')}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-600">
                Ou escreva um texto personalizado abaixo
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-10">
                <Badge className="bg-gray-700 text-white border-0 px-3">OU</Badge>
              </div>
              <div className="border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="text" className="text-gray-900 font-semibold text-lg">
                Texto personalizado
              </Label>
              <Textarea
                id="text"
                placeholder="Escreva o roteiro do seu vídeo aqui..."
                rows={6}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Film className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pipeline de Geração</h3>
                  <p className="text-sm text-gray-600">IA trabalhará em várias etapas</p>
                </div>
              </div>

              <ol className="space-y-2 text-sm text-gray-700 ml-11">
                <li className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-blue-600">
                    1
                  </span>
                  Análise do roteiro
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-blue-600">
                    2
                  </span>
                  Síntese de voz (TTS)
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-blue-600">
                    3
                  </span>
                  Geração de legendas
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-blue-600">
                    4
                  </span>
                  Renderização final
                </li>
              </ol>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  Tempo estimado: 5-10 minutos
                </div>
              </div>
            </Card>

            <Button
              type="submit"
              disabled={generateMutation.isPending || (!selectedPromptId && !textContent)}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl"
            >
              {generateMutation.isPending ? (
                'Iniciando geração...'
              ) : (
                <>
                  Gerar Vídeo com IA (5 créditos)
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            {(!selectedPromptId && !textContent) && (
              <p className="text-center text-sm text-gray-500">
                Selecione um prompt ou escreva um texto para continuar
              </p>
            )}
          </form>
        </Card>
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
