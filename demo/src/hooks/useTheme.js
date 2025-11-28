import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'scaling-ui-theme';

/**
 * Custom hook for managing theme state (light/dark/system)
 * - Persists preference to localStorage
 * - Applies .dark class to document.documentElement
 * - Listens to system preference changes
 *
 * @returns {{ theme: string, setTheme: function, resolvedTheme: string }}
 */
export function useTheme() {
    const [theme, setThemeState] = useState(() => {
        if (typeof window === 'undefined') return 'system';
        return localStorage.getItem(STORAGE_KEY) || 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState(() => {
        if (typeof window === 'undefined') return 'light';
        if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return theme;
    });

    // Apply theme to document
    const applyTheme = useCallback((newTheme) => {
        const root = document.documentElement;
        let resolved;

        if (newTheme === 'system') {
            resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            resolved = newTheme;
        }

        if (resolved === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        setResolvedTheme(resolved);
    }, []);

    // Set theme and persist to localStorage
    const setTheme = useCallback((newTheme) => {
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
        applyTheme(newTheme);
    }, [applyTheme]);

    // Cycle through themes: light -> dark -> system -> light
    const cycleTheme = useCallback(() => {
        const order = ['light', 'dark', 'system'];
        const currentIndex = order.indexOf(theme);
        const nextIndex = (currentIndex + 1) % order.length;
        setTheme(order[nextIndex]);
    }, [theme, setTheme]);

    // Apply theme on mount and listen to system changes
    useEffect(() => {
        applyTheme(theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, applyTheme]);

    return {
        theme,
        setTheme,
        cycleTheme,
        resolvedTheme
    };
}

export default useTheme;
