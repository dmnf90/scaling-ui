import React from 'react';
import { cn } from '../utils.js';

/**
 * Base menu item component used by ContextMenu, DropdownMenu, and Menubar
 */
export const MenuItem = React.forwardRef(function MenuItem(
    { className, disabled, inset, onClick, onClose, children, ...props },
    ref
) {
    const handleClick = (e) => {
        if (disabled) return;
        onClick?.(e);
        onClose?.();
    };

    return (
        <div
            ref={ref}
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                !disabled && 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                inset && 'pl-8',
                className
            )}
            onClick={handleClick}
            role="menuitem"
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </div>
    );
});
