import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Textarea - A multi-line text input with resize options
 *
 * @param {Object} props - Component props
 * @param {'default' | 'error'} [props.variant='default'] - Visual style variant. Use 'error' for validation errors
 * @param {'none' | 'vertical' | 'horizontal' | 'both'} [props.resize='vertical'] - Resize behavior
 * @param {string} [props.placeholder] - Placeholder text
 * @param {number} [props.rows] - Number of visible text rows
 * @param {boolean} [props.disabled=false] - Whether the textarea is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref to the textarea element
 * @returns {React.ReactElement}
 *
 * @example
 * // Basic usage
 * <Textarea placeholder="Enter your message" />
 *
 * @example
 * // With error state and no resize
 * <Textarea variant="error" resize="none" />
 *
 * @example
 * // Custom rows
 * <Textarea rows={6} placeholder="Write a longer message..." />
 */
const textareaVariants = cva(
    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default: '',
                error: 'border-destructive focus-visible:ring-destructive',
            },
            resize: {
                none: 'resize-none',
                vertical: 'resize-y',
                horizontal: 'resize-x',
                both: 'resize',
            },
        },
        defaultVariants: {
            variant: 'default',
            resize: 'vertical',
        },
    }
);

export const Textarea = React.forwardRef(({
    className,
    variant = 'default',
    resize = 'vertical',
    ...props
}, ref) => {
    return (
        <textarea
            className={cn(textareaVariants({ variant, resize }), className)}
            ref={ref}
            {...props}
        />
    );
});

Textarea.displayName = 'Textarea';
