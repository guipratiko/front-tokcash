'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const mutation = useMutation({
    mutationFn: () => api.forgotPassword({ email }),
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
    if (!email) {
      alert('Por favor, informe seu email')
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
              Email Enviado!
            </h1>
            
            <p className="text-gray-600">
              Enviamos instruções de recuperação de senha para{' '}
              <strong className="text-purple-600">{email}</strong>
            </p>
            
            <p className="text-sm text-gray-500">
              Verifique sua caixa de entrada e siga as instruções. 
              O link expira em 1 hora.
            </p>
            
            <div className="pt-4 space-y-3">
              <Button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Voltar para Login
              </Button>
              
              <button
                onClick={() => setSuccess(false)}
                className="w-full text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Reenviar email
              </button>
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
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Esqueceu sua senha?
          </h1>
          
          <p className="text-gray-600">
            Sem problemas! Informe seu email e enviaremos instruções para recuperá-la.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-300 focus:border-purple-500"
              required
              disabled={mutation.isPending}
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg"
          >
            {mutation.isPending ? 'Enviando...' : 'Enviar Instruções'}
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-gray-200">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Login
          </Link>
        </div>
      </Card>
    </div>
  )
}

