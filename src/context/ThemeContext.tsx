import React, { createContext, useContext, useState } from "react";

export enum Theme {
    light = 'light',
    dark = 'dark'
}

interface ThemeContextType {
    theme: Theme,
    toggleTheme: () => void
}

const ThemeContext = createContext<undefined|ThemeContextType>(undefined)

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<Theme>(Theme.light)
    const toggleTheme = () => {
        const newTheme = theme === Theme.light ? Theme.dark : Theme.light
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}