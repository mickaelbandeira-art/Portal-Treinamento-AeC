'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Mail, Lock, AlertCircle, Loader2, Brain, Zap, Shield, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            router.push('/')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login')
        } finally {
            setLoading(false)
        }
    }

    const features = [
        { icon: Brain, title: 'IA Integrada', description: 'Assistente inteligente para suporte 24/7' },
        { icon: Zap, title: 'Aprendizado Rápido', description: 'Trilhas personalizadas e adaptativas' },
        { icon: Shield, title: 'Segurança Total', description: 'Dados protegidos com criptografia' },
        { icon: TrendingUp, title: 'Analytics Avançado', description: 'Métricas em tempo real' }
    ]

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-[#001a33] via-[#002244] to-[#001a33]">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                {/* Floating Orbs - AeC Colors */}
                <div className="absolute top-20 left-20 h-96 w-96 bg-[#005EB8] rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute top-40 right-20 h-80 w-80 bg-[#00B8D4] rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
                <div className="absolute bottom-20 left-1/3 h-72 w-72 bg-[#E91E63] rounded-full blur-3xl opacity-15 animate-pulse delay-2000" />
                <div className="absolute bottom-40 right-1/4 h-64 w-64 bg-[#FFD600] rounded-full blur-3xl opacity-10 animate-pulse delay-3000" />

                {/* Animated Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#005EB8" />
                            <stop offset="50%" stopColor="#00B8D4" />
                            <stop offset="100%" stopColor="#E91E63" />
                        </linearGradient>
                    </defs>
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse delay-1000" />
                </svg>
            </div>

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-16 text-white">
                <div className="space-y-8">
                    {/* Logo */}
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#005EB8] via-[#00B8D4] to-[#E91E63] flex items-center justify-center shadow-2xl shadow-[#005EB8]/50">
                            <Sparkles className="h-10 w-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#005EB8] via-[#00B8D4] to-[#E91E63] bg-clip-text text-transparent">
                                Portal AeC
                            </h1>
                            <p className="text-[#00B8D4] text-lg mt-1">Relacionamento com Responsabilidade</p>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold leading-tight">
                            Plataforma de Treinamento
                            <span className="block bg-gradient-to-r from-[#00B8D4] to-[#E91E63] bg-clip-text text-transparent">
                                Corporativo com IA
                            </span>
                        </h2>
                        <p className="text-lg text-gray-300 max-w-md">
                            Transforme o desenvolvimento da sua equipe com tecnologia de ponta e inteligência artificial integrada.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-6 mt-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                <feature.icon className="h-8 w-8 text-[#00B8D4] mb-3" />
                                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                <p className="text-sm text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                        <div>
                            <p className="text-3xl font-bold text-[#00B8D4]">10k+</p>
                            <p className="text-sm text-gray-400">Usuários Ativos</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-[#E91E63]">500+</p>
                            <p className="text-sm text-gray-400">Cursos Disponíveis</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-[#FFD600]">98%</p>
                            <p className="text-sm text-gray-400">Satisfação</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader className="text-center space-y-4">
                        {/* Mobile Logo */}
                        <div className="lg:hidden mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-[#005EB8] via-[#00B8D4] to-[#E91E63] flex items-center justify-center shadow-xl">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-bold text-white">
                                Bem-vindo de volta
                            </CardTitle>
                            <CardDescription className="text-gray-300 mt-2">
                                Entre com suas credenciais para acessar a plataforma
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-red-400" />
                                    <p className="text-sm text-red-400">{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2 text-white">
                                    <Mail className="h-4 w-4 text-[#00B8D4]" />
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00B8D4] focus:ring-[#00B8D4]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="flex items-center gap-2 text-white">
                                    <Lock className="h-4 w-4 text-[#00B8D4]" />
                                    Senha
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00B8D4] focus:ring-[#00B8D4]"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#005EB8] via-[#00B8D4] to-[#E91E63] hover:opacity-90 transition-opacity text-white font-semibold py-6 text-lg shadow-lg shadow-[#005EB8]/50"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Entrando...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Entrar na Plataforma
                                    </>
                                )}
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    className="text-sm text-[#00B8D4] hover:text-[#E91E63] transition-colors"
                                >
                                    Esqueceu sua senha?
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-xs text-center text-gray-400">
                                Desenvolvido por <span className="text-[#00B8D4] font-semibold">Mickael Bandeira</span> | Analista de Conteúdo
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
