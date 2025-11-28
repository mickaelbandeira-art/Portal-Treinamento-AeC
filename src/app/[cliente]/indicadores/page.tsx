import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { StatCard } from '@/components/ui/stat-card'
import { DashboardCharts } from '@/components/charts/dashboard-charts'
import { TrendingUp, Users, Award, Clock, Target, Brain } from 'lucide-react'

export default async function IndicadoresPage({ params }: { params: { cliente: string } }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: userData } = await supabase
        .from('usuarios')
        .select('nome, hierarquia(cargo, nivel)')
        .eq('email', user.email)
        .single()

    const kpis = [
        { title: 'Taxa de Aprovação', value: '94%', icon: Award, color: 'green' as const, trend: { value: 3, isPositive: true } },
        { title: 'Média de Notas', value: '8.7', icon: Target, color: 'primary' as const, trend: { value: 0.5, isPositive: true } },
        { title: 'Tempo Médio', value: '4.2h', icon: Clock, color: 'cyan' as const },
        { title: 'Engajamento', value: '87%', icon: TrendingUp, color: 'yellow' as const, trend: { value: 12, isPositive: true } },
        { title: 'Alunos Ativos', value: '1,247', icon: Users, color: 'purple' as const, trend: { value: 15, isPositive: true } },
        { title: 'Análises IA', value: '3,421', icon: Brain, color: 'primary' as const, trend: { value: 23, isPositive: true } },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Sidebar clientSlug={params.cliente} />
            <Header userName={userData?.nome} userRole={(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo} />

            <main className="ml-64 mt-16 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold gradient-text">Indicadores de Performance</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Acompanhe métricas e KPIs do programa de treinamento
                    </p>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {kpis.map((kpi) => (
                        <StatCard key={kpi.title} {...kpi} />
                    ))}
                </div>

                {/* Charts */}
                <DashboardCharts />

                {/* AI Insights */}
                <div className="mt-8 glass-card p-6 border-primary/20">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold gradient-text">Insights Gerados por IA</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-green-400/10 border border-green-400/20">
                            <p className="text-sm">
                                <span className="font-semibold text-green-400">✓ Excelente:</span> A taxa de aprovação está 12% acima da meta estabelecida
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                            <p className="text-sm">
                                <span className="font-semibold text-yellow-400">⚠ Atenção:</span> O tempo médio de conclusão aumentou 15 minutos este mês
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                            <p className="text-sm">
                                <span className="font-semibold text-primary">💡 Sugestão:</span> Considere adicionar mais conteúdo interativo para aumentar o engajamento
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
