import React from 'react';
import { cn } from '../utils.js';

/**
 * Menu label component for section headers
 */
export function MenuLabel({ className, inset, children, ...props }) {
    return (
        <div
            className={cn(
                'px-2 py-1.5 text-sm font-semibold',
                inset && 'pl-8',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
