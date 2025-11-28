import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { StatCard } from '@/components/ui/stat-card'
import { Users, GraduationCap, BookOpen, TrendingUp, Brain, Target, Award, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

    const stats = [
        { title: 'Total de Clientes', value: clientes?.length || 0, icon: Users, color: 'primary' as const, trend: { value: 12, isPositive: true } },
        { title: 'Turmas Ativas', value: 24, icon: GraduationCap, color: 'cyan' as const, trend: { value: 8, isPositive: true } },
        { title: 'Instrutores', value: 45, icon: Target, color: 'green' as const },
        { title: 'Alunos Ativos', value: 1247, icon: Users, color: 'yellow' as const, trend: { value: 15, isPositive: true } },
        { title: 'Cursos Disponíveis', value: 128, icon: BookOpen, color: 'purple' as const },
        { title: 'Taxa de Conclusão', value: '87%', icon: Award, color: 'green' as const, trend: { value: 5, isPositive: true } },
        { title: 'Horas de Treinamento', value: '12.5k', icon: Clock, color: 'cyan' as const },
        { title: 'Análises IA', value: 3421, icon: Brain, color: 'primary' as const, trend: { value: 23, isPositive: true } },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <Header userName={userData?.nome} userRole={(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo} />

            <main className="ml-64 mt-16 p-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">
                        Bem-vindo de volta, {userData?.nome}! 👋
                    </h1>
                    <p className="text-muted-foreground">
                        Aqui está um resumo do seu portal de treinamento corporativo
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>

                {/* Clients Grid */}
                <Card className="glass-card mb-8">
                    <CardHeader>
                        <CardTitle className="gradient-text">Clientes Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {clientes?.map((cliente) => (
                                <a
                                    key={cliente.id}
                                    href={`/${cliente.nome.toLowerCase()}`}
                                    className="glass-card p-6 hover:neon-border transition-all cursor-pointer group hover:scale-105"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                                            <span className="text-xl font-bold text-white">
                                                {cliente.nome.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold group-hover:gradient-text transition-all">
                                                {cliente.nome}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Ver detalhes →
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
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
                    </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="glass-card border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-primary" />
                            <span className="gradient-text">Insights de IA</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <p className="text-sm">
                                    <span className="font-semibold text-primary">Tendência Positiva:</span> A taxa de conclusão de cursos aumentou 15% este mês
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
                                <p className="text-sm">
                                    <span className="font-semibold text-cyan-400">Recomendação:</span> 3 novos instrutores são necessários para atender a demanda crescente
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-green-400/10 border border-green-400/20">
                                <p className="text-sm">
                                    <span className="font-semibold text-green-400">Destaque:</span> O curso "Atendimento ao Cliente" teve 98% de satisfação
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
