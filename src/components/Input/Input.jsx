import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Input - A text input field with multiple variants and sizes
 *
 * @param {Object} props - Component props
 * @param {'default' | 'error'} [props.variant='default'] - Visual style variant. Use 'error' for validation errors
 * @param {'sm' | 'md' | 'lg'} [props.inputSize='md'] - Size of the input field
 * @param {string} [props.type='text'] - HTML input type (text, email, password, number, etc.)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref to the input element
 * @returns {React.ReactElement}
 *
 * @example
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * @example
 * // With error state
 * <Input variant="error" placeholder="Invalid email" />
 *
 * @example
 * // Different sizes
 * <Input inputSize="sm" placeholder="Small" />
 * <Input inputSize="lg" placeholder="Large" />
 */
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
