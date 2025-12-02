import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../utils.js';

/**
 * Checkbox menu item used by ContextMenu, DropdownMenu, and Menubar
 */
export function MenuCheckboxItem({
    className,
    checked,
    onCheckedChange,
    disabled,
    children,
    ...props
}) {
    const handleClick = () => {
        if (disabled) return;
        onCheckedChange?.(!checked);
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
            role="menuitemcheckbox"
            aria-checked={checked}
            aria-disabled={disabled}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {checked && <Check className="h-4 w-4" />}
            </span>
            {children}
        </div>
    );
}
