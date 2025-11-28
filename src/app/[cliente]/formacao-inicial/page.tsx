import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Clock, Users, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function FormacaoInicialPage({ params }: { params: { cliente: string } }) {
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

    // Fetch mandatory courses
    const { data: cursos } = await supabase
        .from('cursos_obrigatorios')
        .select('*')

    const mockCourses = cursos && cursos.length > 0 ? cursos : [
        { id: 1, titulo: 'Introdução ao Atendimento', descricao: 'Fundamentos do atendimento ao cliente', duracao: '2h', alunos: 245 },
        { id: 2, titulo: 'Produtos e Serviços', descricao: 'Conheça nosso portfólio completo', duracao: '3h', alunos: 198 },
        { id: 3, titulo: 'Sistemas Internos', descricao: 'Como utilizar nossas ferramentas', duracao: '1.5h', alunos: 312 },
        { id: 4, titulo: 'Compliance e Ética', descricao: 'Normas e condutas profissionais', duracao: '2.5h', alunos: 267 },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Sidebar clientSlug={params.cliente} />
            <Header userName={userData?.nome} userRole={(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo} />

            <main className="ml-64 mt-16 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold gradient-text">Formação Inicial</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Trilha de onboarding para novos colaboradores
                    </p>
                </div>

                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="glass-card border-primary/20">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Progresso Geral</p>
                                    <p className="text-3xl font-bold">45%</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <GraduationCap className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-cyan-400/20">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Cursos Concluídos</p>
                                    <p className="text-3xl font-bold">2/4</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-cyan-400/20 flex items-center justify-center">
                                    <PlayCircle className="h-6 w-6 text-cyan-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-green-400/20">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Tempo Investido</p>
                                    <p className="text-3xl font-bold">5.5h</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-green-400/20 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCourses.map((curso, index) => (
                        <Card key={curso.id} className="glass-card hover:neon-border transition-all group hover:scale-105">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-400/20 flex items-center justify-center">
                                        <span className="text-xl font-bold text-primary">{index + 1}</span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-xs border border-green-400/20">
                                        Obrigatório
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
                                        <span>{curso.duracao || '2h'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{curso.alunos || 0} alunos</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-primary to-cyan-400">
                                    <PlayCircle className="h-4 w-4 mr-2" />
                                    Iniciar Curso
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
