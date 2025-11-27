import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user data
    const { data: userData } = await supabase
        .from('usuarios')
        .select('nome, hierarquia(cargo, nivel)')
        .eq('email', user.email)
        .single()

    // Fetch all clients for overview
    const { data: clientes } = await supabase
        .from('clientes')
        .select('*')

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="glass-card p-6 neon-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text">
                                Dashboard Corporativo
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Bem-vindo, {userData?.nome} • {(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo}
                            </p>
                        </div>
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">
                                {userData?.nome?.charAt(0)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-card p-6 border-l-4 border-primary">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Clientes</p>
                                <p className="text-3xl font-bold text-foreground">{clientes?.length || 0}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 border-l-4 border-cyan-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Turmas Ativas</p>
                                <p className="text-3xl font-bold text-foreground">0</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-cyan-400/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 border-l-4 border-green-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Instrutores</p>
                                <p className="text-3xl font-bold text-foreground">0</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-400/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 border-l-4 border-yellow-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Alunos Ativos</p>
                                <p className="text-3xl font-bold text-foreground">0</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clients Grid */}
                <div className="glass-card p-6">
                    <h2 className="text-2xl font-bold mb-6 gradient-text">Clientes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clientes?.map((cliente) => (
                            <a
                                key={cliente.id}
                                href={`/${cliente.nome.toLowerCase()}`}
                                className="glass-card p-4 hover:neon-border transition-all cursor-pointer group"
                            >
                                <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">
                                    {cliente.nome}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {cliente.descricao || 'Sem descrição'}
                                </p>
                            </a>
                        ))}
                        {(!clientes || clientes.length === 0) && (
                            <p className="text-muted-foreground col-span-full text-center py-8">
                                Nenhum cliente cadastrado
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
