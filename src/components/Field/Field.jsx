import React from 'react';
import { Label } from '../Label/Label';
import { cn } from '../../lib/utils';

export function Field({
    label,
    htmlFor,
    required = false,
    error,
    hint,
    className,
    children,
    ...props
}) {
    return (
        <div className={cn('space-y-2', className)} {...props}>
            {label && (
                <Label htmlFor={htmlFor} required={required}>
                    {label}
                </Label>
            )}
            {children}
            {hint && !error && (
                <p className="text-sm text-muted-foreground">{hint}</p>
            )}
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}
