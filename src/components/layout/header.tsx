'use client'

'use client'

import { Bell, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/providers/theme-provider'

interface HeaderProps {
    userName?: string
    userRole?: string
}

export function Header({ userName = 'Usuário', userRole = 'Colaborador' }: HeaderProps) {
    const { theme } = useTheme()

    return (
        <header
            className="fixed top-0 right-0 left-64 h-16 bg-background/80 backdrop-blur-xl border-b z-30 px-6"
            style={{ borderColor: `${theme.primary}33` }}
        >
            <div className="flex items-center justify-between h-full">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar cursos, materiais..."
                            className="pl-10 bg-background/50"
                            style={{ borderColor: `${theme.primary}33` }}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button
                        className="relative p-2 rounded-lg transition-colors"
                        style={{ backgroundColor: `${theme.primary}10` }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${theme.primary}20`}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${theme.primary}10`}
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    </button>

                    {/* User Menu */}
                    <div
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                        style={{ backgroundColor: `${theme.primary}10` }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${theme.primary}20`}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${theme.primary}10`}
                    >
                        <div
                            className="h-8 w-8 rounded-full flex items-center justify-center"
                            style={{ background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})` }}
                        >
                            <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-medium">{userName}</p>
                            <p className="text-xs text-muted-foreground">{userRole}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
