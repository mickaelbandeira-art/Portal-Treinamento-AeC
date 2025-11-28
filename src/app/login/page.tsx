'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Sparkles,
    GraduationCap,
    BookOpen,
    PieChart,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Loader2
} from 'lucide-react'

export default function LandingPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithPassword({
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

    const cards = [
        {
            title: "Formação Inicial",
            icon: GraduationCap,
            color: "#00BBEE", // Céu
            description: "Trilhas de aprendizado para novos colaboradores."
        },
        {
            title: "Formação Continuada",
            icon: BookOpen,
            color: "#8CC63F", // Folha
            description: "Desenvolvimento constante e atualização de skills."
        },
        {
            title: "Visão 360°",
            icon: PieChart,
            color: "#E6007E", // Rubi
            description: "Análise completa de desempenho e engajamento."
        },
        {
            title: "Indicadores",
            icon: BarChart3,
            color: "#FFCC00", // Sol
            description: "Métricas em tempo real para tomada de decisão."
        }
    ]

    const clients = [
        { name: "Claro", color: "#E8232A" },
        { name: "iFood", color: "#EA1D2C" },
        { name: "iFood Pago", color: "#6B1144" },
        { name: "Banco Inter", color: "#FF7A00" },
        { name: "Ton", color: "#00FF00" }
    ]

    return (
        <div className="min-h-screen bg-[#0E0E11] text-white font-sans selection:bg-[#00BBEE] selection:text-white overflow-x-hidden">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004C99] via-[#0E0E11] to-[#0E0E11] opacity-40" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

                {/* Glow Effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#004C99] rounded-full blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00BBEE] rounded-full blur-[120px] opacity-10" />

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-[#FFCC00]" />
                            <span className="text-sm font-medium text-gray-300">Powered by AeC Intelligence</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                            Portal Corporativo de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BBEE] to-[#004C99]">
                                Formação e Treinamento
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                            Sistema unificado de gestão de formação inicial, continuada e indicadores com inteligência de dados.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        className="h-14 px-8 text-lg font-semibold bg-[#FFCC00] text-[#0E0E11] hover:bg-[#FFCC00]/90 shadow-[0_0_20px_rgba(255,204,0,0.3)] transition-all hover:scale-105 rounded-xl"
                                    >
                                        Acessar Portal
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-[#0E0E11]/95 backdrop-blur-xl border border-white/10 text-white sm:rounded-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-center mb-2">Acessar Conta</DialogTitle>
                                        <DialogDescription className="text-center text-gray-400">
                                            Entre com suas credenciais corporativas
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleLogin} className="space-y-6 mt-4">
                                        {error && (
                                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                                {error}
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <Label className="text-gray-300">Email Corporativo</Label>
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-white/5 border-white/10 text-white focus:border-[#00BBEE] h-12"
                                                placeholder="nome@aec.com.br"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-gray-300">Senha</Label>
                                            <Input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-white/5 border-white/10 text-white focus:border-[#00BBEE] h-12"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-[#004C99] hover:bg-[#004C99]/90 text-white font-semibold text-lg"
                                            disabled={loading}
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Button variant="outline" className="h-14 px-8 text-lg font-medium border-white/10 text-white hover:bg-white/5 rounded-xl">
                                Saiba mais
                            </Button>
                        </div>
                    </div>

                    {/* Hero Illustration (Abstract/Tech) */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                            {/* Central Circle */}
                            <div className="absolute inset-0 m-auto w-[400px] h-[400px] rounded-full border border-[#00BBEE]/20 animate-[spin_60s_linear_infinite]" />
                            <div className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full border border-[#E6007E]/20 animate-[spin_40s_linear_infinite_reverse]" />

                            {/* Floating Cards Mockup */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-gradient-to-b from-[#004C99]/20 to-[#0E0E11]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex flex-col p-6 gap-4 transform -rotate-6 hover:rotate-0 transition-all duration-700">
                                <div className="h-8 w-8 rounded-lg bg-[#00BBEE] mb-2" />
                                <div className="h-4 w-3/4 bg-white/10 rounded" />
                                <div className="h-4 w-1/2 bg-white/10 rounded" />
                                <div className="mt-auto h-32 w-full bg-gradient-to-t from-[#00BBEE]/20 to-transparent rounded-xl" />
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-[#0E0E11] rounded-2xl border border-white/10 shadow-2xl flex flex-col p-6 gap-4 transform rotate-6 translate-x-12 translate-y-8 hover:rotate-0 hover:translate-x-0 hover:translate-y-0 transition-all duration-700 z-10">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="h-8 w-8 rounded-lg bg-[#E6007E]" />
                                    <div className="h-2 w-2 rounded-full bg-[#8CC63F]" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-20 w-full bg-white/5 rounded-xl border border-white/5 p-3 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-[#004C99]/20" />
                                        <div className="flex-1">
                                            <div className="h-2 w-20 bg-white/20 rounded mb-1" />
                                            <div className="h-2 w-12 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                    <div className="h-20 w-full bg-white/5 rounded-xl border border-white/5 p-3 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-[#FFCC00]/20" />
                                        <div className="flex-1">
                                            <div className="h-2 w-20 bg-white/20 rounded mb-1" />
                                            <div className="h-2 w-12 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CARDS SECTION --- */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-[#0E0E11]/50 border border-white/5 hover:border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                                style={{ boxShadow: `0 0 0 1px ${card.color}00` }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        background: `linear-gradient(135deg, ${card.color}20, ${card.color}05)`,
                                        border: `1px solid ${card.color}40`
                                    }}
                                >
                                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-white">{card.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CLIENTS SECTION --- */}
            <section className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold text-white mb-2">Selecione o Cliente</h2>
                        <p className="text-gray-400">Acesse o ambiente exclusivo de cada parceiro</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {clients.map((client, index) => (
                            <div
                                key={index}
                                className="group relative w-40 h-24 rounded-xl bg-[#0E0E11] border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-transparent"
                            >
                                <div
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                                    style={{ backgroundColor: `${client.color}40` }}
                                />
                                <div
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border"
                                    style={{ borderColor: client.color }}
                                />
                                <span className="relative z-10 font-bold text-lg text-gray-300 group-hover:text-white transition-colors">
                                    {client.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 bg-white text-[#0E0E11]">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#004C99] flex items-center justify-center text-white">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block font-bold text-lg tracking-tight">AeC Portal</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Formação & Treinamento</span>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-gray-600">
                        Relacionamento com Responsabilidade.
                    </p>

                    <div className="text-xs text-gray-400">
                        © {new Date().getFullYear()} AeC. Todos os direitos reservados.
                    </div>
                </div>
            </footer>
        </div>
    )
}
