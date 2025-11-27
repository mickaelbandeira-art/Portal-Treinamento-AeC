import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

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

    // Fetch continuous training courses (simulated by fetching all for now)
    const { data: cursos } = await supabase
        .from('cursos_obrigatorios')
        .select('*')
    // .eq('tipo', 'continuada') // In real app

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="glass-card p-6 neon-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text">
                                Formação Continuada
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Cursos de reciclagem e aprimoramento profissional
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
                        <div key={curso.id} className="glass-card p-6 hover:neon-border transition-all group border-l-4 border-cyan-400">
                            <div className="h-40 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="h-12 w-12 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">{curso.titulo}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                {curso.descricao || 'Sem descrição disponível.'}
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs border border-cyan-400/20">
                                    Reciclagem
                                </span>
                                <span className="px-2 py-1 rounded-full bg-blue-400/10 text-blue-400 text-xs border border-blue-400/20">
                                    Técnico
                                </span>
                            </div>
                            <button className="w-full mt-4 py-2 rounded-md bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 border border-cyan-400/20 transition-all">
                                Acessar Conteúdo
                            </button>
                        </div>
                    ))}
                    {(!cursos || cursos.length === 0) && (
                        <div className="col-span-full text-center py-12 glass-card">
                            <p className="text-muted-foreground">Nenhum curso de formação continuada disponível.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
