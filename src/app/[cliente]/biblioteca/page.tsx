import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Video, FileCode, Download, Eye, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function BibliotecaPage({ params }: { params: { cliente: string } }) {
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

    const materials = [
        {
            id: 1,
            title: 'Manual de Atendimento ao Cliente',
            type: 'PDF',
            icon: FileText,
            size: '2.4 MB',
            downloads: 1247,
            category: 'Manuais',
            color: 'red'
        },
        {
            id: 2,
            title: 'Vídeo: Técnicas de Vendas',
            type: 'Vídeo',
            icon: Video,
            size: '45 MB',
            downloads: 892,
            category: 'Vídeos',
            color: 'blue'
        },
        {
            id: 3,
            title: 'Guia de Produtos 2024',
            type: 'PDF',
            icon: FileText,
            size: '5.1 MB',
            downloads: 2103,
            category: 'Guias',
            color: 'green'
        },
        {
            id: 4,
            title: 'Scripts de Atendimento',
            type: 'Documento',
            icon: FileCode,
            size: '890 KB',
            downloads: 1567,
            category: 'Scripts',
            color: 'purple'
        },
        {
            id: 5,
            title: 'Treinamento de Compliance',
            type: 'Vídeo',
            icon: Video,
            size: '120 MB',
            downloads: 743,
            category: 'Vídeos',
            color: 'yellow'
        },
        {
            id: 6,
            title: 'FAQ - Perguntas Frequentes',
            type: 'PDF',
            icon: FileText,
            size: '1.2 MB',
            downloads: 3421,
            category: 'FAQs',
            color: 'cyan'
        },
    ]

    const categories = ['Todos', 'Manuais', 'Vídeos', 'Guias', 'Scripts', 'FAQs']

    return (
        <div className="min-h-screen bg-background">
            <Sidebar clientSlug={params.cliente} />
            <Header userName={userData?.nome} userRole={(userData?.hierarquia as any)?.cargo || (userData?.hierarquia as any)?.[0]?.cargo} />

            <main className="ml-64 mt-16 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold gradient-text">Biblioteca de Conteúdo</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Acesse materiais, vídeos e documentos de treinamento
                    </p>
                </div>

                {/* Categories */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-all whitespace-nowrap"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map((material) => (
                        <Card key={material.id} className="glass-card hover:neon-border transition-all group hover:scale-105">
                            <CardContent className="p-6">
                                <div className={`h-16 w-16 rounded-lg bg-${material.color}-400/20 flex items-center justify-center mb-4`}>
                                    <material.icon className={`h-8 w-8 text-${material.color}-400`} />
                                </div>

                                <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all">
                                    {material.title}
                                </h3>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <span>{material.type}</span>
                                    <span>•</span>
                                    <span>{material.size}</span>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                    <Download className="h-3 w-3" />
                                    <span>{material.downloads} downloads</span>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1" size="sm">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Visualizar
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
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
