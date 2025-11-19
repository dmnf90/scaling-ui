import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const spinnerVariants = cva(
    'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
    {
        variants: {
            size: {
                sm: 'h-4 w-4 border-2',
                md: 'h-8 w-8 border-2',
                lg: 'h-12 w-12 border-[3px]',
                xl: 'h-16 w-16 border-4',
            },
            variant: {
                default: 'text-primary',
                secondary: 'text-secondary',
                muted: 'text-muted-foreground',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'default',
        },
    }
);

export function Spinner({
    className,
    size = 'md',
    variant = 'default',
    ...props
}) {
    return (
        <div
            role="status"
            className={cn(spinnerVariants({ size, variant }), className)}
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}
