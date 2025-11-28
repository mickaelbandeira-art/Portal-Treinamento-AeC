'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronRight, Target, Eye, RotateCcw, Building2, Sparkles } from "lucide-react"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

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

    const clients = [
        { name: "Claro", color: "text-[#E8232A]", bg: "bg-[#E8232A]/10", border: "border-[#E8232A]/20", path: "/claro" },
        { name: "iFood", color: "text-[#EA1D2C]", bg: "bg-[#EA1D2C]/10", border: "border-[#EA1D2C]/20", path: "/ifood" },
        { name: "iFood Pago", color: "text-[#6B1144]", bg: "bg-[#6B1144]/10", border: "border-[#6B1144]/20", path: "/ifood-pago" },
        { name: "Inter", color: "text-[#FF7A00]", bg: "bg-[#FF7A00]/10", border: "border-[#FF7A00]/20", path: "/banco-inter" },
        { name: "Ton", color: "text-[#00D95F]", bg: "bg-[#00D95F]/10", border: "border-[#00D95F]/20", path: "/ton" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 text-[#0E0E11] font-sans selection:bg-[#00BBEE] selection:text-white">

            {/* Modern Minimalist Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo AeC Simulado */}
                        <div className="flex items-center gap-1">
                            <span className="text-3xl font-bold tracking-tighter text-[#004C99]">aec</span>
                            <div className="h-6 w-[1px] bg-gray-300 mx-2 hidden sm:block"></div>
                            <div className="hidden sm:flex flex-col justify-center text-[10px] leading-tight text-gray-500 font-medium uppercase tracking-wide">
                                <span>Relacionamento com</span>
                                <span>Responsabilidade</span>
                            </div>
                        </div>

                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#home" className="text-sm font-medium text-gray-500 hover:text-[#004C99] transition-colors relative group">
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00BBEE] transition-all group-hover:w-full"></span>
                            </a>
                            <a href="#visao-geral" className="text-sm font-medium text-gray-500 hover:text-[#004C99] transition-colors relative group">
                                Visão Geral
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00BBEE] transition-all group-hover:w-full"></span>
                            </a>
                            <a href="#objetivo" className="text-sm font-medium text-gray-500 hover:text-[#004C99] transition-colors relative group">
                                Objetivo
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00BBEE] transition-all group-hover:w-full"></span>
                            </a>
                            <a href="#360" className="text-sm font-medium text-gray-500 hover:text-[#004C99] transition-colors relative group">
                                360º
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00BBEE] transition-all group-hover:w-full"></span>
                            </a>
                        </nav>

                        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="bg-gradient-to-r from-[#004C99] to-[#00BBEE] hover:opacity-90 transition-opacity text-white rounded-full px-6">
                                    Acessar Sistema
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md bg-white rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-xl font-bold text-[#004C99]">Acesso Corporativo</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Entre com suas credenciais AeC
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                                    {error && (
                                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center border border-red-100">
                                            {error}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="nome@aec.com.br"
                                            className="rounded-lg border-gray-200 focus:ring-[#00BBEE]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Senha</Label>
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="rounded-lg border-gray-200 focus:ring-[#00BBEE]"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full rounded-lg bg-[#004C99] hover:bg-[#003d7a] text-white" disabled={loading}>
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                        Entrar
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="container mx-auto px-4 pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
                {/* Decorative Elements */}
                <div className="absolute top-20 right-[15%] w-72 h-72 bg-[#00BBEE]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-[#004C99]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
                    {/* Left Side - Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#004C99] text-xs font-semibold uppercase tracking-wider mb-2">
                                <Sparkles className="w-3 h-3" />
                                Inteligência Artificial
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[#0E0E11]">
                                Assistente Virtual <br />
                                <span className="bg-gradient-to-r from-[#004C99] to-[#00BBEE] bg-clip-text text-transparent">
                                    Autonomia e Performance
                                </span>
                            </h1>
                            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
                                Sistema Corporativo de Gestão de Formação Inicial e Continuada com governança,
                                rastreabilidade e padronização com Inteligência Artificial.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-[#004C99] hover:bg-[#003d7a] text-white text-lg px-8 h-14 rounded-xl shadow-lg shadow-blue-900/10 group" onClick={() => setIsLoginOpen(true)}>
                                Começar Agora
                                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-xl border-gray-200 hover:bg-gray-50 text-gray-600">
                                Ver Demonstração
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Client Cards */}
                    <div className="relative">
                        {/* Decorative Circle Behind Cards */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[500px] h-[500px] bg-gradient-to-br from-blue-100/50 via-cyan-100/30 to-purple-100/20 rounded-full blur-3xl"></div>
                        </div>

                        {/* Client Cards Grid */}
                        <div className="relative z-10 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                            {clients.map((client, index) => (
                                <div
                                    key={client.name}
                                    className={`group relative overflow-hidden rounded-2xl bg-white border ${client.border} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[140px]`}
                                    onClick={() => setIsLoginOpen(true)}
                                >
                                    <div className={`w-12 h-12 rounded-full ${client.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                        <Building2 className={`w-6 h-6 ${client.color}`} />
                                    </div>

                                    <span className={`text-xl font-bold ${client.color}`}>{client.name}</span>

                                    <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-[#00BBEE] transition-colors">
                                        Acessar
                                        <ChevronRight className="w-3 h-3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Visão Geral Section */}
            <section id="visao-geral" className="container mx-auto px-4 py-24 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-blue-50 text-[#004C99]">
                            <Eye className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-bold text-[#0E0E11]">
                            Visão Geral
                        </h2>
                    </div>
                    <p className="text-xl text-gray-500 leading-relaxed font-light">
                        O Sistema Corporativo de Gestão de Formação Inicial e Continuada é uma plataforma integrada que gerencia todo o ciclo de capacitação dos colaboradores, desde o ingresso (Formação Inicial) até a reciclagem contínua (Formação Continuada), garantindo governança, rastreabilidade e padronização alinhada à hierarquia corporativa.
                    </p>
                </div>
            </section>

            {/* Objetivos Section */}
            <section id="objetivo" className="container mx-auto px-4 py-24 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-xl bg-cyan-50 text-[#00BBEE]">
                            <Target className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-bold text-[#0E0E11]">
                            Objetivos do Produto
                        </h2>
                    </div>
                    <ul className="space-y-6">
                        {[
                            "Centralizar todo o processo de Treinamento e Desenvolvimento.",
                            "Controlar etapas, avaliações, evidências, acessos e indicadores.",
                            "Integrar com Supabase (banco de dados) e hospedar na Vercel.",
                            "Atuar como ferramenta oficial da Diretoria de Pessoas para tomada de decisão baseada em dados.",
                            "Fornecer visão 360º do processo de capacitação: Instrutor → Conteúdo → Colaborador → Operação."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-100 transition-colors shadow-sm">
                                <div className="mt-1 p-1 rounded-full bg-blue-50 text-[#004C99]">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                                <span className="text-lg text-gray-600">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 360º Section */}
            <section id="360" className="container mx-auto px-4 py-24 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex p-3 rounded-xl bg-pink-50 text-[#E6007E] mb-4">
                            <RotateCcw className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-bold text-[#0E0E11] mb-4">
                            Visão 360º
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Nossa plataforma oferece uma visão completa e integrada do processo de capacitação, conectando todos os elementos essenciais.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: "Instrutor", desc: "Gestão completa de instrutores, suas especializações e disponibilidade.", color: "border-l-4 border-[#004C99]" },
                            { title: "Conteúdo", desc: "Controle de materiais, trilhas e recursos didáticos padronizados.", color: "border-l-4 border-[#00BBEE]" },
                            { title: "Colaborador", desc: "Acompanhamento individual de progresso, certificações e desenvolvimento.", color: "border-l-4 border-[#E6007E]" },
                            { title: "Operação", desc: "Indicadores e métricas para tomada de decisão estratégica.", color: "border-l-4 border-[#FFCC00]" }
                        ].map((card, i) => (
                            <div key={i} className={`p-6 rounded-xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 hover:-translate-y-1 transition-transform ${card.color}`}>
                                <h3 className="font-bold text-xl mb-3 text-[#0E0E11]">{card.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modern Footer */}
            <footer className="bg-[#F8FAFC] border-t border-gray-200 pt-20 pb-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-1">
                                <span className="text-3xl font-bold tracking-tighter text-[#004C99]">aec</span>
                            </div>
                            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                                Desenvolvido por <span className="font-semibold text-[#004C99]">Mickael Bandeira</span> <br />
                                Analista de Conteúdo
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-[#0E0E11] mb-6">Links Rápidos</h3>
                            <ul className="space-y-3">
                                <li><a href="#home" className="text-sm text-gray-500 hover:text-[#004C99] transition-colors">Home</a></li>
                                <li><a href="#visao-geral" className="text-sm text-gray-500 hover:text-[#004C99] transition-colors">Visão Geral</a></li>
                                <li><a href="#objetivo" className="text-sm text-gray-500 hover:text-[#004C99] transition-colors">Objetivo</a></li>
                                <li><a href="#360" className="text-sm text-gray-500 hover:text-[#004C99] transition-colors">360º</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-[#0E0E11] mb-6">Contato</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Entre em contato para saber mais sobre nossas soluções de treinamento corporativo.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} AeC. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
