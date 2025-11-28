import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '../../../src/index.js';
import { useTheme } from '../hooks/useTheme';

const themeConfig = {
    light: {
        icon: Sun,
        label: 'Light',
        next: 'dark'
    },
    dark: {
        icon: Moon,
        label: 'Dark',
        next: 'system'
    },
    system: {
        icon: Monitor,
        label: 'System',
        next: 'light'
    }
};

/**
 * Theme toggle button that cycles through light -> dark -> system
 */
export function ThemeToggle() {
    const { theme, cycleTheme } = useTheme();
    const config = themeConfig[theme];
    const Icon = config.icon;

    return (
        <button
            onClick={cycleTheme}
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title={`Current: ${config.label}. Click to switch.`}
        >
            <Icon className="h-4 w-4" />
            <span>{config.label}</span>
        </button>
    );
}

export default ThemeToggle;
