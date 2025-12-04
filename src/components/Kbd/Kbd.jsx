import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Kbd - Keyboard key indicator element
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Key text (e.g., "⌘", "K", "Enter")
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Kbd>⌘</Kbd><Kbd>K</Kbd>
 *
 * @example
 * <p>Press <Kbd>Enter</Kbd> to submit</p>
 */
export function Kbd({ className, children, ...props }) {
    return (
        <kbd
            className={cn(
                'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-sans text-xs font-medium text-muted-foreground',
                className
            )}
            {...props}
        >
            {children}
        </kbd>
    );
}
