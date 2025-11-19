import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const separatorVariants = cva(
    'shrink-0 bg-border',
    {
        variants: {
            orientation: {
                horizontal: 'h-px w-full',
                vertical: 'h-full w-px',
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    }
);

export function Separator({
    className,
    orientation = 'horizontal',
    decorative = true,
    ...props
}) {
    return (
        <div
            role={decorative ? 'none' : 'separator'}
            aria-orientation={decorative ? undefined : orientation}
            className={cn(separatorVariants({ orientation }), className)}
            {...props}
        />
    );
}
