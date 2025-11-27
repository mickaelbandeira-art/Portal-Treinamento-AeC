import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { alunoId } = await request.json()

        // Fetch training, quality, and performance data
        const { data: treinamentoData } = await supabase
            .from('avaliacoes_finais')
            .select('*')
            .eq('aluno_id', alunoId)

        const { data: presencaData } = await supabase
            .from('presenca_diaria')
            .select('*')
            .eq('aluno_id', alunoId)

        // TODO: Integrate with Gemini API for 360° analysis
        // For now, return a placeholder response
        const analise = {
            treinamento: {
                mediaNotas: 0,
                aproveitamento: '0%',
                pontosFortes: [],
                pontosAMelhorar: [],
            },
            qualidade: {
                score: 0,
                tendencia: 'estavel',
            },
            performance: {
                produtividade: 0,
                eficiencia: 0,
            },
            recomendacoes: [
                'Análise 360° será implementada em breve com IA.',
            ],
        }

        // Log AI interaction
        await supabase.from('logs_ai').insert({
            usuario_id: user.id,
            acao: 'analise_360',
            prompt: JSON.stringify({ alunoId }),
            resposta: JSON.stringify(analise),
            modelo: 'gemini',
        })

        return NextResponse.json(analise)
    } catch (error) {
        console.error('AI 360 Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
