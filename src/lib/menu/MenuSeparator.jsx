import React from 'react';
import { cn } from '../utils.js';

/**
 * Menu separator component
 */
export function MenuSeparator({ className, ...props }) {
    return (
        <div
            className={cn('-mx-1 my-1 h-px bg-border', className)}
            role="separator"
            {...props}
        />
    );
}
