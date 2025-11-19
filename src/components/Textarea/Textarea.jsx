import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

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
