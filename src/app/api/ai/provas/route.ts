import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { avaliacaoId, respostas } = await request.json()

        // Log AI interaction
        await supabase.from('logs_ai').insert({
            usuario_id: user.id,
            acao: 'correcao_prova',
            prompt: JSON.stringify({ avaliacaoId, respostas }),
            modelo: 'gemini',
        })

        // TODO: Integrate with Gemini API for auto-correction
        // For now, return a placeholder response
        const resultado = {
            nota: 0,
            feedback: 'Correção automática será implementada em breve.',
            detalhes: [],
        }

        return NextResponse.json(resultado)
    } catch (error) {
        console.error('AI Provas Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
