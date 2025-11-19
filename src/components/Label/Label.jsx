import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    {
        variants: {
            required: {
                true: 'after:content-["*"] after:ml-0.5 after:text-destructive',
                false: '',
            },
        },
        defaultVariants: {
            required: false,
        },
    }
);

export function Label({
    className,
    required = false,
    htmlFor,
    children,
    ...props
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={cn(labelVariants({ required }), className)}
            {...props}
        >
            {children}
        </label>
    );
}
