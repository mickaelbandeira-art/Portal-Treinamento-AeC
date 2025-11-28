'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            router.push('/')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan-400/20 animate-pulse" />

            {/* Floating Elements */}
            <div className="absolute top-20 left-20 h-64 w-64 bg-primary/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 h-96 w-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <Card className="w-full max-w-md glass-card neon-border relative z-10 mx-4">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center animate-pulse">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold gradient-text">
                            Portal AeC
                        </CardTitle>
                        <CardDescription className="text-muted-foreground mt-2">
                            Plataforma de Treinamento Corporativo com IA
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-background/50 border-primary/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Senha
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-background/50 border-primary/20"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 transition-opacity"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Esqueceu sua senha?
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 pt-6 border-t border-primary/20">
                        <p className="text-xs text-center text-muted-foreground">
                            Desenvolvido por <span className="text-primary font-semibold">Mickael Bandeira</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
