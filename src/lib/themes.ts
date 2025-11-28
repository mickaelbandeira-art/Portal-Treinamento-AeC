// Theme configuration for each client
export const clientThemes = {
    claro: {
        primary: '#E8232A',
        secondary: '#FFFFFF',
        accent: '#E8232A',
        gradient: 'from-[#E8232A] to-[#FF4444]',
        name: 'Claro',
        colors: {
            red: '#E8232A',
            white: '#FFFFFF',
            dark: '#1A1A1A'
        }
    },
    ifood: {
        primary: '#EA1D2C',
        secondary: '#FFC700',
        accent: '#FF6B35',
        gradient: 'from-[#EA1D2C] via-[#FF6B35] to-[#FFC700]',
        name: 'iFood',
        colors: {
            red: '#EA1D2C',
            yellow: '#FFC700',
            cream: '#F5E6D3',
            orange: '#FF6B35'
        }
    },
    'ifood-pago': {
        primary: '#6B1144',
        secondary: '#E8B4E8',
        accent: '#7FEFBD',
        gradient: 'from-[#6B1144] via-[#E8B4E8] to-[#7FEFBD]',
        name: 'iFood Pago',
        colors: {
            purple: '#6B1144',
            pink: '#E8B4E8',
            mint: '#7FEFBD'
        }
    },
    ton: {
        primary: '#00FF00',
        secondary: '#00A859',
        accent: '#00FF00',
        gradient: 'from-[#00FF00] to-[#00A859]',
        name: 'Ton',
        colors: {
            neonGreen: '#00FF00',
            darkGreen: '#00A859',
            white: '#FFFFFF'
        }
    },
    stone: {
        primary: '#00FF00',
        secondary: '#00A859',
        accent: '#00FF00',
        gradient: 'from-[#00FF00] to-[#00A859]',
        name: 'Stone',
        colors: {
            neonGreen: '#00FF00',
            darkGreen: '#00A859',
            white: '#FFFFFF'
        }
    },
    'banco-inter': {
        primary: '#FF7A00',
        secondary: '#FFFFFF',
        accent: '#FF7A00',
        gradient: 'from-[#FF7A00] to-[#FF9933]',
        name: 'Banco Inter',
        colors: {
            orange: '#FF7A00',
            white: '#FFFFFF',
            dark: '#1A1A1A'
        }
    },
    default: {
        primary: '#005EB8',
        secondary: '#00B8D4',
        accent: '#E91E63',
        gradient: 'from-[#005EB8] via-[#00B8D4] to-[#E91E63]',
        name: 'Portal AeC',
        colors: {
            cobalto: '#005EB8',
            ceu: '#00B8D4',
            rubi: '#E91E63',
            sol: '#FFD600',
            folha: '#B4D455'
        }
    }
}

export type ClientSlug = keyof typeof clientThemes

export function getClientTheme(slug: string) {
    const normalizedSlug = slug.toLowerCase().replace(/\s+/g, '-')
    return clientThemes[normalizedSlug as ClientSlug] || clientThemes.default
}
