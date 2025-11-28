import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, Users, PlayCircle, Award, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function FormacaoContinuadaPage({ params }: { params: { cliente: string } }) {
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

    // Fetch continuous training courses
    const { data: cursos } = await supabase
        .from('cursos_obrigatorios')
        .select('*')

    const mockCourses = cursos && cursos.length > 0 ? cursos : [
        { id: 1, titulo: 'Técnicas Avançadas de Vendas', descricao: 'Aprimore suas habilidades comerciais', duracao: '4h', nivel: 'Avançado', alunos: 156 },
        { id: 2, titulo: 'Gestão de Conflitos', descricao: 'Como lidar com situações desafiadoras', duracao: '3h', nivel: 'Intermediário', alunos: 203 },
        { id: 3, titulo: 'Liderança e Motivação', descricao: 'Desenvolva suas competências de liderança', duracao: '5h', nivel: 'Avançado', alunos: 98 },
        { id: 4, titulo: 'Atualização de Produtos 2024', descricao: 'Novidades e lançamentos', duracao: '2h', nivel: 'Básico', alunos: 421 },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Sidebar clientSlug={params.cliente} />
            <Header userName={userData?.nome} userRole={(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo} />

            <main className="ml-64 mt-16 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-4xl font-bold gradient-text">Formação Continuada</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Cursos de reciclagem e aprimoramento profissional
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="glass-card border-cyan-400/20">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Cursos Concluídos</p>
                                    <p className="text-3xl font-bold">12</p>
                                </div>
                                <Award className="h-8 w-8 text-cyan-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-green-400/20">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Certificados</p>
                                    <p className="text-3xl font-bold">8</p>
                                </div>
                                <Award className="h-8 w-8 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-purple-400/20">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Horas Totais</p>
                                    <p className="text-3xl font-bold">48h</p>
                                </div>
                                <Clock className="h-8 w-8 text-purple-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-yellow-400/20">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Ranking</p>
                                    <p className="text-3xl font-bold">#15</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-yellow-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCourses.map((curso, index) => (
                        <Card key={curso.id} className="glass-card hover:neon-border transition-all group hover:scale-105 border-l-4 border-cyan-400">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center">
                                        <BookOpen className="h-6 w-6 text-cyan-400" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs border ${curso.nivel === 'Avançado' ? 'bg-red-400/10 text-red-400 border-red-400/20' :
                                            curso.nivel === 'Intermediário' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' :
                                                'bg-green-400/10 text-green-400 border-green-400/20'
                                        }`}>
                                        {curso.nivel}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                                    {curso.titulo}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {curso.descricao || 'Sem descrição disponível.'}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{curso.duracao}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{curso.alunos} alunos</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-600">
                                        <PlayCircle className="h-4 w-4 mr-2" />
                                        Acessar Curso
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
