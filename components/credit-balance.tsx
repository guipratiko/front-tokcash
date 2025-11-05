'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, TrendingUp } from 'lucide-react'
import { api } from '@/lib/api'
import { motion } from 'framer-motion'

export function CreditBalance() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ['credits', 'balance'],
    queryFn: async () => {
      const result = await api.getBalance()
      return {
        promptCredits: (result.data as any)?.promptCredits ?? 0,
        videoCredits: (result.data as any)?.videoCredits ?? 0,
      }
    },
  })

  if (!isMounted) {
    return (
      <Card className="p-6 border-0 shadow-xl shadow-purple-200/50 bg-gradient-to-br from-purple-500 to-pink-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl">
              <Coins className="h-8 w-8" />
            </div>
            <Badge className="bg-white/20 backdrop-blur-xl border-0 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Ativos
            </Badge>
          </div>
          <div className="space-y-3">
            <p className="text-white/80 text-sm font-medium">
              Ativos
            </p>
            
            {/* Créditos de Prompts */}
            <div className="space-y-1">
              <p className="text-white/80 text-sm font-medium">
                Créditos de prompts Disponíveis
            </p>
            <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold">
                <span className="animate-pulse">...</span>
              </p>
              </div>
              <p className="text-white/70 text-sm">
                1 crédito = 1 prompt
              </p>
            </div>

            {/* Créditos de Vídeos */}
            <div className="space-y-1 pt-3 border-t border-white/20">
              <p className="text-white/80 text-sm font-medium">
                Créditos de videos Disponíveis
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold">
                  <span className="animate-pulse">...</span>
                </p>
            </div>
            <p className="text-white/70 text-sm">
                1 crédito = 1 video
            </p>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-0 shadow-xl shadow-purple-200/50 bg-gradient-to-br from-purple-500 to-pink-600 text-white overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl">
              <Coins className="h-8 w-8" />
            </div>
            <Badge className="bg-white/20 backdrop-blur-xl border-0 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Ativos
            </Badge>
          </div>

          <div className="space-y-3">
            <p className="text-white/80 text-sm font-medium">
              Ativos
            </p>
            
            {/* Créditos de Prompts */}
            <div className="space-y-1">
              <p className="text-white/80 text-sm font-medium">
                Créditos de prompts Disponíveis
            </p>
            <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                    data?.promptCredits ?? 0
                )}
              </p>
              </div>
              <p className="text-white/70 text-sm">
                1 crédito = 1 prompt
              </p>
            </div>

            {/* Créditos de Vídeos */}
            <div className="space-y-1 pt-3 border-t border-white/20">
              <p className="text-white/80 text-sm font-medium">
                Créditos de videos Disponíveis
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    data?.videoCredits ?? 0
                  )}
                </p>
            </div>
            <p className="text-white/70 text-sm">
                1 crédito = 1 video
            </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
