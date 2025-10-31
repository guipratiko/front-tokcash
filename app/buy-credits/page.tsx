'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Coins, Sparkles, Video, CheckCircle, Zap, Shield, Rocket } from 'lucide-react'
import { api } from '@/lib/api'

export default function BuyCreditsPage() {
  const { data: balanceData } = useQuery({
    queryKey: ['credits', 'balance'],
    queryFn: async () => {
      const result = await api.getBalance()
      return {
        promptCredits: (result.data as any)?.promptCredits ?? 0,
        videoCredits: (result.data as any)?.videoCredits ?? 0,
      }
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white relative">
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
      </div>
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
            <Coins className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Comprar Créditos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Adicione créditos à sua conta e crie conteúdo viral sem limites
          </p>
        </motion.div>

        {/* Current Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <Card className="p-6 border-2 border-purple-200 shadow-xl shadow-purple-200/50 bg-gradient-to-br from-white to-purple-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Créditos de Prompts</p>
                  <p className="text-3xl font-bold text-purple-600">{balanceData?.promptCredits ?? 0}</p>
                  <p className="text-xs text-gray-500 mt-1">1 crédito = 1 prompt</p>
                </div>
                <div className="p-4 bg-purple-100 rounded-2xl">
                  <Coins className="h-10 w-10 text-purple-600" />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Créditos de Vídeos</p>
                    <p className="text-3xl font-bold text-purple-600">{balanceData?.videoCredits ?? 0}</p>
                    <p className="text-xs text-gray-500 mt-1">1 crédito = 1 video</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Plans Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative"
            >
              <Card className="p-8 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Plano Único
                </h3>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl text-gray-600">R$</span>
                    <span className="text-5xl font-bold text-gray-900">97</span>
                    <span className="text-xl text-gray-600">/mês</span>
                  </div>
                  <Badge className="mt-3 bg-purple-100 border-0 text-gray-700">
                    15 créditos
                  </Badge>
                </div>

                <p className="text-center text-gray-600 text-sm mb-6">
                  Ideal para iniciar sua jornada no TikTok
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>15 créditos renovados todo mês</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Geração automática de vídeos curtos e virais</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Tendências semanais do TikTok</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Geração de prompts virais prontos</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm font-semibold text-green-700 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fonte de renda extra +R$ 3.900/mês</span>
                  </li>
                </ul>

                <Button
                  onClick={() => window.location.href = 'https://checkout.perfectpay.com.br/pay/PPU38CQ2L0K'}
                  className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-xl font-semibold"
                >
                  Comprar Agora
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  R$ 6.47 por crédito
                </p>
              </Card>
            </motion.div>

            {/* Upsell 1 - Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative"
            >
              <Card className="p-8 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
                <Badge className="absolute top-4 right-4 bg-blue-500 text-white border-0">
                  Prompts
                </Badge>

                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Créditos de Prompts
                </h3>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl text-gray-600">R$</span>
                    <span className="text-5xl font-bold text-gray-900">29</span>
                  </div>
                  <Badge className="mt-3 bg-blue-100 border-0 text-gray-700">
                    15 créditos
                  </Badge>
                </div>

                <p className="text-center text-gray-600 text-sm mb-6">
                  Perfeito para gerar mais prompts virais
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>15 créditos de prompt</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Gere 15 prompts com IA</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Créditos não expiram</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Pagamento único</span>
                  </li>
                </ul>

                <Button
                  onClick={() => window.location.href = 'https://checkout.perfectpay.com.br/pay/PPU38CQ2PC0'}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl font-semibold"
                >
                  Comprar Agora
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  R$ 1.93 por crédito
                </p>
              </Card>
            </motion.div>

            {/* Upsell 2 - Videos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative"
            >
              <Card className="p-8 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50">
                <Badge className="absolute top-4 right-4 bg-pink-500 text-white border-0">
                  Vídeos
                </Badge>

                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg">
                    <Video className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Créditos de Vídeos
                </h3>

                <div className="text-center mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl text-gray-600">R$</span>
                    <span className="text-5xl font-bold text-gray-900">59</span>
                  </div>
                  <Badge className="mt-3 bg-pink-100 border-0 text-gray-700">
                    5 créditos
                  </Badge>
                </div>

                <p className="text-center text-gray-600 text-sm mb-6">
                  Perfeito para criar mais vídeos virais
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>5 créditos de vídeo</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Gere 5 vídeos completos com IA</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Créditos não expiram</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span>Pagamento único</span>
                  </li>
                </ul>

                <Button
                  onClick={() => window.location.href = 'https://checkout.perfectpay.com.br/pay/PPU38CQ2PC0'}
                  className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-xl font-semibold"
                >
                  Comprar Agora
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  R$ 11.80 por crédito
                </p>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 border-0 shadow-xl shadow-gray-200/50 bg-gradient-to-br from-blue-50 to-purple-50">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Por que comprar créditos?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Pagamento Seguro',
                  description: 'Cartão de crédito, Pix ou boleto bancário'
                },
                {
                  icon: Rocket,
                  title: 'Acesso Instantâneo',
                  description: 'Créditos disponíveis logo após confirmação do pagamento'
                },
                {
                  icon: Video,
                  title: 'Cancele Quando Quiser',
                  description: 'Sem multas, sem burocracia. Cancele a qualquer momento'
                }
              ].map((benefit, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex p-3 bg-white rounded-2xl mb-3 shadow-lg">
                    <benefit.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Como funcionam os créditos?
          </h3>
          <p className="text-gray-600 mb-2">
            <strong>1 crédito</strong> = 1 prompt gerado com IA
          </p>
          <p className="text-gray-600 mb-2">
            <strong>5 créditos</strong> = 1 vídeo completo com IA
          </p>
          <p className="text-gray-600 mb-6">
            <strong>Créditos não expiram</strong> - use quando quiser
          </p>
          <p className="text-sm text-gray-500">
            Todos os créditos adicionados são seus para sempre. Use quando quiser!
          </p>
        </motion.div>
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
