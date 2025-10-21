'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { 
  Coins, 
  Sparkles, 
  Video, 
  CheckCircle, 
  Star,
  Zap,
  TrendingUp,
  Crown,
  Shield,
  Rocket
} from 'lucide-react'
import { api } from '@/lib/api'

export default function BuyCreditsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { data: plansData } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const result = await api.getPlans()
      return (result.data as any) || []
    },
  })

  const { data: balanceData } = useQuery({
    queryKey: ['credits', 'balance'],
    queryFn: async () => {
      const result = await api.getBalance()
      return (result.data as any)?.balance || 0
    },
  })

  const createOrderMutation = useMutation({
    mutationFn: async (planCode: string) => {
      const result = await api.createOrder(planCode)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    onSuccess: (data: any) => {
      // Em produção, redirecionar para checkout
      alert(`Pedido criado! ID: ${data?.order?.id}\n\nEm produção, você seria redirecionado para: ${data?.checkoutUrl}`)
      setLoading(false)
      setSelectedPlan(null)
    },
    onError: (error: any) => {
      alert(`Erro: ${error.message}`)
      setLoading(false)
    }
  })

  const handleBuyPlan = (planCode: string) => {
    setSelectedPlan(planCode)
    setLoading(true)
    createOrderMutation.mutate(planCode)
  }

  const planIcons = {
    START: { icon: Zap, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50' },
    PRO: { icon: Star, color: 'from-yellow-500 to-orange-600', bg: 'bg-yellow-50' },
    INFINITY: { icon: Crown, color: 'from-red-500 to-pink-600', bg: 'bg-red-50' }
  }

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
            Assinar Plano Mensal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Receba créditos todos os meses e crie conteúdo viral sem parar
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Saldo Atual</p>
                <p className="text-4xl font-bold text-purple-600">{balanceData}</p>
                <p className="text-xs text-gray-500 mt-1">créditos disponíveis</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-2xl">
                <Coins className="h-10 w-10 text-purple-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plansData?.map((plan: any, i: number) => {
            const config = planIcons[plan.code as keyof typeof planIcons]
            const Icon = config.icon
            const isPopular = plan.code === 'PRO'

            return (
              <motion.div
                key={plan.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-4 py-1.5 shadow-lg">
                      <Star className="h-3 w-3 mr-1 inline" />
                      MAIS POPULAR
                    </Badge>
                  </div>
                )}

                <Card className={`p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${config.bg} ${isPopular ? 'scale-105 border-2 border-yellow-400' : ''}`}>
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-br ${config.color} rounded-2xl shadow-lg`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-xl text-gray-600">R$</span>
                      <span className="text-5xl font-bold text-gray-900">{plan.priceBRL}</span>
                      <span className="text-xl text-gray-600">/mês</span>
                    </div>
                    <Badge className={`mt-3 ${config.bg} border-0 text-gray-700`}>
                      {plan.credits} créditos/mês
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-center text-gray-600 text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleBuyPlan(plan.code)}
                    disabled={loading && selectedPlan === plan.code}
                    className={`w-full h-14 text-lg bg-gradient-to-r ${config.color} hover:opacity-90 text-white shadow-xl font-semibold`}
                  >
                    {loading && selectedPlan === plan.code ? (
                      'Processando...'
                    ) : (
                      <>
                        Assinar {plan.code}
                        <Sparkles className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  {/* Value per credit */}
                  <p className="text-center text-xs text-gray-500 mt-3">
                    R$ {(plan.priceBRL / plan.credits).toFixed(2)} por crédito • Renovação automática
                  </p>
                </Card>
              </motion.div>
            )
          })}
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
            Como funcionam as assinaturas?
          </h3>
          <p className="text-gray-600 mb-2">
            <strong>Renovação mensal:</strong> Seus créditos são renovados todo mês automaticamente
          </p>
          <p className="text-gray-600 mb-2">
            <strong>1 crédito</strong> = 1 prompt gerado
          </p>
          <p className="text-gray-600 mb-6">
            <strong>5 créditos</strong> = 1 vídeo completo com IA
          </p>
          <p className="text-sm text-gray-500">
            Créditos não utilizados acumulam para o próximo mês. Cancele quando quiser.
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

