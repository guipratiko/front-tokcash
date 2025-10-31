'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { 
  Users, 
  DollarSign, 
  Video, 
  Sparkles, 
  TrendingUp, 
  Calendar,
  Clock,
  Loader2,
  ShieldCheck
} from 'lucide-react'
import { api } from '@/lib/api'

export default function AdminPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState<'hour' | 'day' | 'month' | 'year'>('day')

  // Verificar se é admin
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const result = await api.me()
      return (result.data as any)?.user
    },
  })

  // Buscar métricas de admin
  const { data: adminData, isLoading: adminLoading } = useQuery({
    queryKey: ['admin', 'metrics', selectedPeriod],
    queryFn: async () => {
      const result = await api.getAdminMetrics(selectedPeriod)
      if (result.error) throw new Error(result.error)
      return result.data
    },
    enabled: !!userData, // Só busca se tiver usuário
  })

  // Verificar se é admin após carregar dados do usuário
  useEffect(() => {
    if (!userLoading && userData) {
      const adminIds = ['69017c312d3349fdcd287356', '6901fdf32d3349fdcd28737c', '6902beede139a32841ef03d5']
      if (!adminIds.includes(userData.id)) {
        router.push('/dashboard')
      }
    }
  }, [userData, userLoading, router])

  if (userLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  const metrics = adminData as any

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
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Painel Administrativo</h1>
          </div>
          <p className="text-gray-600">
            Visão geral do sistema e métricas de negócio
          </p>
        </motion.div>

        {/* Filtro de Período */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex gap-2">
            {[
              { value: 'hour', label: 'Última Hora', icon: Clock },
              { value: 'day', label: 'Hoje', icon: Calendar },
              { value: 'month', label: 'Este Mês', icon: Calendar },
              { value: 'year', label: 'Este Ano', icon: TrendingUp },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedPeriod === period.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <period.icon className="h-4 w-4" />
                {period.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards de Métricas Principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Clientes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-0">Total</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {metrics?.totalUsers || 0}
              </h3>
              <p className="text-sm text-gray-600">Clientes Cadastrados</p>
            </Card>
          </motion.div>

          {/* Total de Vendas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-0">Receita</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                R$ {(metrics?.totalRevenue || 0).toFixed(2)}
              </h3>
              <p className="text-sm text-gray-600">Valor Recebido</p>
            </Card>
          </motion.div>

          {/* Total de Vídeos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-gradient-to-br from-pink-50 to-rose-50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-500 rounded-xl">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-pink-100 text-pink-700 border-0">{selectedPeriod === 'hour' ? 'Hora' : selectedPeriod === 'day' ? 'Hoje' : selectedPeriod === 'month' ? 'Mês' : 'Ano'}</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {metrics?.videosGenerated || 0}
              </h3>
              <p className="text-sm text-gray-600">Vídeos Gerados</p>
              <p className="text-xs text-gray-500 mt-2">
                Custo: ${((metrics?.videosGenerated || 0) * 0.10).toFixed(2)}
              </p>
            </Card>
          </motion.div>

          {/* Total de Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-gradient-to-br from-purple-50 to-violet-50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-0">{selectedPeriod === 'hour' ? 'Hora' : selectedPeriod === 'day' ? 'Hoje' : selectedPeriod === 'month' ? 'Mês' : 'Ano'}</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {metrics?.promptsGenerated || 0}
              </h3>
              <p className="text-sm text-gray-600">Prompts Gerados</p>
            </Card>
          </motion.div>
        </div>

        {/* Detalhamento de Vendas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-white mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Detalhamento de Vendas
            </h2>

            <div className="space-y-4">
              {/* Plano Principal */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Plano Mensal</h3>
                  <p className="text-sm text-gray-600">15 créditos/mês</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Valor cheio: <span className="line-through">R$ 97,00</span></p>
                  <p className="text-lg font-bold text-green-600">R$ 87,82</p>
                  <p className="text-xs text-gray-500">{metrics?.sales?.monthly || 0} vendas</p>
                </div>
              </div>

              {/* Upsell Vídeos */}
              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Upsell - Créditos de Vídeos</h3>
                  <p className="text-sm text-gray-600">5 créditos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Valor cheio: <span className="line-through">R$ 59,00</span></p>
                  <p className="text-lg font-bold text-green-600">R$ 53,41</p>
                  <p className="text-xs text-gray-500">{metrics?.sales?.videoUpsell || 0} vendas</p>
                </div>
              </div>

              {/* Upsell Prompts */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Upsell - Créditos de Prompts</h3>
                  <p className="text-sm text-gray-600">15 créditos</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Valor cheio: <span className="line-through">R$ 29,00</span></p>
                  <p className="text-lg font-bold text-green-600">R$ 26,25</p>
                  <p className="text-xs text-gray-500">{metrics?.sales?.promptUpsell || 0} vendas</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Custos Operacionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 border-0 shadow-xl shadow-gray-200/50 bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              Custos Operacionais ({selectedPeriod === 'hour' ? 'Última Hora' : selectedPeriod === 'day' ? 'Hoje' : selectedPeriod === 'month' ? 'Este Mês' : 'Este Ano'})
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Custo de Vídeos Gerados</h3>
                  <p className="text-sm text-gray-600">US$ 0,10 por vídeo</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">
                    ${((metrics?.videosGenerated || 0) * 0.10).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{metrics?.videosGenerated || 0} vídeos</p>
                </div>
              </div>

              {/* Lucro Estimado */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div>
                  <h3 className="font-semibold text-gray-900">Margem de Lucro</h3>
                  <p className="text-sm text-gray-600">Receita - Custos</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    R$ {((metrics?.totalRevenue || 0) - ((metrics?.videosGenerated || 0) * 0.10 * 5.5)).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">Aprox. (considerando câmbio R$ 5.50)</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

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

