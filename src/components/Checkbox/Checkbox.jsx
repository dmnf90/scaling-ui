import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export const Checkbox = React.forwardRef(({
    className,
    checked,
    disabled,
    ...props
}, ref) => {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            className={cn(
                'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                checked ? 'bg-primary text-primary-foreground' : 'bg-background',
                className
            )}
            ref={ref}
            {...props}
        >
            {checked && (
                <Check className="h-4 w-4" strokeWidth={3} />
            )}
        </button>
    );
});

Checkbox.displayName = 'Checkbox';
