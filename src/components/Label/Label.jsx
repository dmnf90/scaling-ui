import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Label - A form label component with optional required indicator
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.required=false] - Shows a red asterisk (*) to indicate required field
 * @param {string} [props.htmlFor] - ID of the form element this label is associated with
 * @param {React.ReactNode} [props.children] - Label text content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * // Basic usage
 * <Label htmlFor="email">Email</Label>
 *
 * @example
 * // Required field indicator
 * <Label htmlFor="name" required>Name</Label>
 */
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
