import React from 'react';
import { cn } from '../utils.js';

/**
 * Radio group wrapper for menu radio items
 */
export function MenuRadioGroup({ value, onValueChange, children, ...props }) {
    return (
        <div role="group" {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        checked: child.props.value === value,
                        onSelect: () => onValueChange?.(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

/**
 * Radio item used inside MenuRadioGroup
 */
export function MenuRadioItem({
    className,
    value,
    checked,
    onSelect,
    disabled,
    children,
    ...props
}) {
    const handleClick = () => {
        if (disabled) return;
        onSelect?.(value);
    };

    return (
        <div
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
                !disabled && 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            onClick={handleClick}
            role="menuitemradio"
            aria-checked={checked}
            aria-disabled={disabled}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {checked && <div className="h-2 w-2 rounded-full bg-current" />}
            </span>
            {children}
        </div>
    );
}
