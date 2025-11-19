import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
    'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default: '',
                error: 'border-destructive focus-visible:ring-destructive',
            },
            inputSize: {
                sm: 'h-8 text-xs px-2',
                md: 'h-10',
                lg: 'h-12 text-base px-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            inputSize: 'md',
        },
    }
);

export const Input = React.forwardRef(({
    className,
    type = 'text',
    variant = 'default',
    inputSize = 'md',
    ...props
}, ref) => {
    return (
        <input
            type={type}
            className={cn(inputVariants({ variant, inputSize }), className)}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = 'Input';
