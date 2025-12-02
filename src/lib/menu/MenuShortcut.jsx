import React from 'react';
import { cn } from '../utils.js';

/**
 * Menu shortcut component for keyboard shortcuts display
 */
export function MenuShortcut({ className, children, ...props }) {
    return (
        <span
            className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
            {...props}
        >
            {children}
        </span>
    );
}
