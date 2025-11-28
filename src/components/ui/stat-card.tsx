'use client'

import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useTheme } from '@/components/providers/theme-provider'

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    trend?: {
        value: number
        isPositive: boolean
    }
    color?: 'primary' | 'cyan' | 'green' | 'yellow' | 'purple'
}

export function StatCard({ title, value, icon: Icon, trend, color = 'primary' }: StatCardProps) {
    const { theme } = useTheme()

    const colorMap: Record<string, string> = {
        primary: theme.primary,
        cyan: theme.secondary,
        green: '#10B981',
        yellow: '#F59E0B',
        purple: '#8B5CF6'
    }

    const selectedColor = colorMap[color] || theme.primary

    return (
        <Card
            className="glass-card border hover:scale-105 transition-all duration-300"
            style={{
                borderColor: `${selectedColor}33`,
                background: `linear-gradient(135deg, ${selectedColor}05, ${selectedColor}10)`
            }}
        >
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        {trend && (
                            <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs mês anterior
                            </p>
                        )}
                    </div>
                    <div
                        className="h-12 w-12 rounded-full flex items-center justify-center"
                        style={{ background: `linear-gradient(to bottom right, ${selectedColor}, ${selectedColor}CC)` }}
                    >
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
