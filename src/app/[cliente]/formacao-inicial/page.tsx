import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

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
    // In a real app, we would filter by client and segment
    const { data: cursos } = await supabase
        .from('cursos_obrigatorios')
        .select('*')

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="glass-card p-6 neon-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text">
                                Formação Inicial
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Trilha de onboarding para novos colaboradores
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">{userData?.nome}</p>
                            <p className="text-xs text-muted-foreground">{(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo}</p>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cursos?.map((curso) => (
                        <div key={curso.id} className="glass-card p-6 hover:neon-border transition-all group">
                            <div className="h-40 bg-gradient-to-br from-primary/20 to-cyan-400/20 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">{curso.titulo}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                {curso.descricao || 'Sem descrição disponível.'}
                            </p>
                            <button className="w-full py-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all">
                                Iniciar Aula
                            </button>
                        </div>
                    ))}
                    {(!cursos || cursos.length === 0) && (
                        <div className="col-span-full text-center py-12 glass-card">
                            <p className="text-muted-foreground">Nenhum curso obrigatório encontrado.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
