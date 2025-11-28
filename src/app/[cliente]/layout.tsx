import { ThemeProvider } from '@/components/providers/theme-provider'

export default async function ClienteLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ cliente: string }>
}) {
    const { cliente } = await params
    return (
        <ThemeProvider clientSlug={cliente}>
            {children}
        </ThemeProvider>
    )
}
