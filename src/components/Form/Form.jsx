import React from 'react';
import { cn } from '../../lib/utils';

export function Form({
    onSubmit,
    className,
    children,
    ...props
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('space-y-6', className)}
            {...props}
        >
            {children}
        </form>
    );
}
