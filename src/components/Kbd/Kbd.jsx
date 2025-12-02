import React from 'react';
import { cn } from '../../lib/utils';

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
