'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sparkles, LogOut, Menu, X } from 'lucide-react'
import { api } from '@/lib/api'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await api.logout()
    router.push('/')
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Prompts', path: '/prompts' },
    { name: 'Vídeos (Em breve)', path: '/videos', disabled: true },
    { name: 'Planos', path: '/buy-credits' },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-gray-200/50 backdrop-blur-xl bg-white/80 shadow-lg shadow-purple-100/50' 
        : 'border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-1">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Image 
              src="/images/logos/LogoTokCash.png" 
              alt="TokCash" 
              width={240} 
              height={80}
              className="h-20 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.disabled ? (
                <Button
                  key={item.path}
                  variant="ghost"
                  disabled
                  className="relative text-gray-400 cursor-not-allowed opacity-60"
                >
                  {item.name}
                </Button>
              ) : (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`relative ${
                      isActive(item.path)
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/50'
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              )
            ))}
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  item.disabled ? (
                    <Button
                      key={item.path}
                      variant="ghost"
                      disabled
                      className="w-full justify-start text-gray-400 cursor-not-allowed opacity-60"
                    >
                      {item.name}
                    </Button>
                  ) : (
                    <Link key={item.path} href={item.path}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          isActive(item.path)
                            ? 'text-purple-600 bg-purple-50'
                            : 'text-gray-700'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  )
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
