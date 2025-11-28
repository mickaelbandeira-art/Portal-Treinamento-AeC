import { ThemeProvider } from '@/components/providers/theme-provider'

export default function ClienteLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { cliente: string }
}) {
    return (
        <ThemeProvider clientSlug={params.cliente}>
            {children}
        </ThemeProvider>
    )
}
