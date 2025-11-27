import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

interface ClientPortalProps {
    params: Promise<{
        cliente: string
    }>
}

export default async function ClientPortal({ params }: ClientPortalProps) {
    const { cliente } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch client data
    const { data: clientData } = await supabase
        .from('clientes')
        .select('*')
        .ilike('nome', cliente)
        .single()

    if (!clientData) {
        notFound()
    }

    // Fetch user data
    const { data: userData } = await supabase
        .from('usuarios')
        .select('nome, hierarquia(cargo, nivel)')
        .eq('email', user.email)
        .single()

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="glass-card p-6 neon-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text">
                                Portal {clientData.nome}
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                {clientData.descricao}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Logado como</p>
                            <p className="font-semibold">{userData?.nome}</p>
                            <p className="text-xs text-muted-foreground">{(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <a href={`/${cliente}/formacao-inicial`} className="glass-card p-6 hover:neon-border transition-all group cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">Formação Inicial</h3>
                                <p className="text-sm text-muted-foreground">Novatos</p>
                            </div>
                        </div>
                    </a>

                    <a href={`/${cliente}/formacao-continuada`} className="glass-card p-6 hover:neon-border transition-all group cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-cyan-400/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">Formação Continuada</h3>
                                <p className="text-sm text-muted-foreground">Veteranos</p>
                            </div>
                        </div>
                    </a>

                    <a href={`/${cliente}/biblioteca`} className="glass-card p-6 hover:neon-border transition-all group cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-green-400/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">Biblioteca</h3>
                                <p className="text-sm text-muted-foreground">Cursos e Materiais</p>
                            </div>
                        </div>
                    </a>

                    <a href={`/${cliente}/indicadores`} className="glass-card p-6 hover:neon-border transition-all group cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">Indicadores</h3>
                                <p className="text-sm text-muted-foreground">Métricas e KPIs</p>
                            </div>
                        </div>
                    </a>

                    <a href={`/${cliente}/assistente-ia`} className="glass-card p-6 hover:neon-border transition-all group cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-purple-400/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">Assistente IA</h3>
                                <p className="text-sm text-muted-foreground">Suporte Inteligente</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
