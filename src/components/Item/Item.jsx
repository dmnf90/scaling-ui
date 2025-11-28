import React from 'react';
import { cn } from '../../lib/utils';

export function Item({
    as: Component = 'div',
    interactive = false,
    selected = false,
    className,
    children,
    ...props
}) {
    return (
        <Component
            className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md',
                interactive && 'cursor-pointer transition-colors hover:bg-accent',
                selected && 'bg-accent',
                className
            )}
            data-selected={selected ? 'true' : undefined}
            {...props}
        >
            {children}
        </Component>
    );
}

export function ItemIcon({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function ItemContent({ className, children, ...props }) {
    return (
        <div className={cn('flex-1 min-w-0', className)} {...props}>
            {children}
        </div>
    );
}

export function ItemTitle({ className, children, ...props }) {
    return (
        <div
            className={cn('font-medium leading-none truncate', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function ItemDescription({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'text-sm text-muted-foreground truncate mt-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function ItemActions({ className, children, ...props }) {
    return (
        <div
            className={cn('flex items-center gap-2 shrink-0', className)}
            {...props}
        >
            {children}
        </div>
    );
}
