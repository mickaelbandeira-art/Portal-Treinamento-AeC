'use client'

import { createContext, useContext, useEffect } from 'react'
import { clientThemes, type ClientSlug } from '@/lib/themes'

interface ThemeContextType {
    theme: typeof clientThemes.default
    clientSlug: string
}

const ThemeContext = createContext<ThemeContextType>({
    theme: clientThemes.default,
    clientSlug: 'default'
})

export function useTheme() {
    return useContext(ThemeContext)
}

interface ThemeProviderProps {
    children: React.ReactNode
    clientSlug: string
}

export function ThemeProvider({ children, clientSlug }: ThemeProviderProps) {
    const normalizedSlug = clientSlug.toLowerCase().replace(/\s+/g, '-')
    const theme = clientThemes[normalizedSlug as ClientSlug] || clientThemes.default

    useEffect(() => {
        // Apply CSS variables for dynamic theming
        document.documentElement.style.setProperty('--theme-primary', theme.primary)
        document.documentElement.style.setProperty('--theme-secondary', theme.secondary)
        document.documentElement.style.setProperty('--theme-accent', theme.accent)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, clientSlug }}>
            {children}
        </ThemeContext.Provider>
    )
}
