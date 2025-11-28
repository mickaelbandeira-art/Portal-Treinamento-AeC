'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/providers/theme-provider'
import {
    Home,
    BookOpen,
    GraduationCap,
    BarChart3,
    Library,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Brain,
    Sparkles
} from 'lucide-react'

interface SidebarProps {
    userRole?: string
    clientSlug?: string
}

export function Sidebar({ userRole = 'admin', clientSlug }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()
    const { theme } = useTheme()

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: clientSlug ? `/${clientSlug}` : '/admin/dashboard' },
        { icon: GraduationCap, label: 'Formação Inicial', href: clientSlug ? `/${clientSlug}/formacao-inicial` : '#' },
        { icon: BookOpen, label: 'Formação Continuada', href: clientSlug ? `/${clientSlug}/formacao-continuada` : '#' },
        { icon: Library, label: 'Biblioteca', href: clientSlug ? `/${clientSlug}/biblioteca` : '#' },
        { icon: BarChart3, label: 'Indicadores', href: clientSlug ? `/${clientSlug}/indicadores` : '#' },
        { icon: Brain, label: 'Assistente IA', href: '#', badge: 'AI' },
        { icon: Users, label: 'Equipe', href: '#' },
        { icon: Settings, label: 'Configurações', href: '#' },
    ]

    return (
        <div
            className={`fixed left-0 top-0 h-screen bg-background/95 backdrop-blur-xl border-r transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-64'
                }`}
            style={{ borderColor: `${theme.primary}33` }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: `${theme.primary}33` }}>
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 rounded-lg flex items-center justify-center"
                            style={{ background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})` }}
                        >
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold" style={{
                            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>{theme.name}</span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg transition-colors"
                    style={{
                        backgroundColor: `${theme.primary}10`,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${theme.primary}20`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${theme.primary}10`}
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group`}
                            style={{
                                backgroundColor: isActive ? `${theme.primary}20` : 'transparent',
                                color: isActive ? theme.primary : undefined,
                                borderLeft: isActive ? `3px solid ${theme.primary}` : '3px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = `${theme.primary}10`
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                        >
                            <item.icon className="h-5 w-5" style={{ color: isActive ? theme.primary : undefined }} />
                            {!collapsed && (
                                <>
                                    <span className="flex-1">{item.label}</span>
                                    {item.badge && (
                                        <span
                                            className="px-2 py-0.5 text-xs rounded-full text-white"
                                            style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: `${theme.primary}33` }}>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all w-full">
                    <LogOut className="h-5 w-5" />
                    {!collapsed && <span>Sair</span>}
                </button>
            </div>
        </div>
    )
}
