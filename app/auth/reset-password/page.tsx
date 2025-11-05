'use client'

import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api'
import { Lock, CheckCircle, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      alert('Token inválido ou ausente')
      router.push('/auth/forgot-password')
    }
  }, [token, router])

  const mutation = useMutation({
    mutationFn: () => api.resetPassword({ token: token!, password }),
    onSuccess: (result) => {
      if (result.error) {
        alert(result.error)
      } else {
        setSuccess(true)
      }
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password || !confirmPassword) {
      alert('Por favor, preencha todos os campos')
      return
    }
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }
    
    if (password.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres')
      return
    }

    if (!/[a-z]/.test(password)) {
      alert('A senha deve conter pelo menos uma letra minúscula')
      return
    }

    if (!/[A-Z]/.test(password)) {
      alert('A senha deve conter pelo menos uma letra maiúscula')
      return
    }

    if (!/[0-9]/.test(password)) {
      alert('A senha deve conter pelo menos um número')
      return
    }
    
    mutation.mutate()
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white p-4">
        <Card className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm shadow-2xl border-2 border-purple-100">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900">
              Senha Alterada com Sucesso!
            </h1>
            
            <p className="text-gray-600">
              Sua senha foi redefinida com sucesso. Você já pode fazer login com sua nova senha.
            </p>
            
            <div className="pt-4">
              <Button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Ir para Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm shadow-2xl border-2 border-purple-100">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Lock className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Nova Senha
          </h1>
          
          <p className="text-gray-600">
            Crie uma nova senha forte para sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Nova Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-gray-300 focus:border-purple-500 pr-12"
                required
                disabled={mutation.isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Mínimo 8 caracteres, com maiúsculas, minúsculas e números
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
              Confirmar Nova Senha
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 border-gray-300 focus:border-purple-500 pr-12"
                required
                disabled={mutation.isPending}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg"
          >
            {mutation.isPending ? 'Alterando...' : 'Alterar Senha'}
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={() => router.push('/auth/login')}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Voltar para Login
          </button>
        </div>
      </Card>
    </div>
  )
}


