import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { message, context } = await request.json()

        // Log AI interaction
        await supabase.from('logs_ai').insert({
            usuario_id: user.id,
            acao: 'chat',
            prompt: message,
            modelo: 'gemini-pro',
        })

        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not defined')
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        // Add context if provided
        let prompt = message
        if (context) {
            prompt = `Contexto: ${context}\n\nMensagem: ${message}`
        }

        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        const response = {
            message: responseText,
            timestamp: new Date().toISOString(),
        }

        // Update log with response
        await supabase.from('logs_ai').insert({
            usuario_id: user.id,
            acao: 'chat_response',
            resposta: response.message,
            modelo: 'gemini-pro',
        })

        return NextResponse.json(response)
    } catch (error) {
        console.error('AI Chat Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
