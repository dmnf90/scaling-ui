import React from 'react';
import { cn } from '../../lib/utils';

export function RadioGroup({ className, children, value, onValueChange, ...props }) {
    return (
        <div
            role="radiogroup"
            className={cn('grid gap-2', className)}
            {...props}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === RadioGroupItem) {
                    return React.cloneElement(child, {
                        checked: child.props.value === value,
                        onClick: () => onValueChange?.(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

export const RadioGroupItem = React.forwardRef(({
    className,
    checked = false,
    value,
    disabled = false,
    ...props
}, ref) => {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={disabled}
            className={cn(
                'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            ref={ref}
            {...props}
        >
            {checked && (
                <span className="flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                </span>
            )}
        </button>
    );
});

RadioGroupItem.displayName = 'RadioGroupItem';
