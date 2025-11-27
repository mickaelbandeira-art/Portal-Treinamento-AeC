export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-destructive/10 p-4">
            <div className="text-center space-y-4">
                <div className="mx-auto h-24 w-24 rounded-full bg-destructive/20 flex items-center justify-center border-2 border-destructive">
                    <svg
                        className="h-12 w-12 text-destructive"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-foreground">Acesso Negado</h1>
                <p className="text-muted-foreground max-w-md">
                    Você não tem permissão para acessar esta página. Entre em contato com seu supervisor.
                </p>
            </div>
        </div>
    )
}
