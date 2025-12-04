import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils.js';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { useClickOutside } from '../../lib/hooks/useClickOutside.js';
import { useEscapeKey } from '../../lib/hooks/useEscapeKey.js';

/**
 * ContextMenu - A right-click context menu component
 *
 * Sub-components:
 * - ContextMenuTrigger: Area where right-click triggers the menu
 * - ContextMenuContent: The menu panel
 * - ContextMenuItem: Clickable menu item
 * - ContextMenuCheckboxItem/ContextMenuRadioItem: Selection items
 * - ContextMenuSub/ContextMenuSubTrigger/ContextMenuSubContent: Nested submenus
 * - ContextMenuSeparator: Visual divider
 * - ContextMenuLabel: Non-interactive label
 * - ContextMenuShortcut: Keyboard shortcut indicator
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - ContextMenuTrigger and ContextMenuContent
 * @returns {React.ReactElement}
 *
 * @example
 * <ContextMenu>
 *     <ContextMenuTrigger>
 *         <div className="border p-4">Right-click me</div>
 *     </ContextMenuTrigger>
 *     <ContextMenuContent>
 *         <ContextMenuItem onSelect={() => console.log('Edit')}>Edit</ContextMenuItem>
 *         <ContextMenuSeparator />
 *         <ContextMenuItem onSelect={() => console.log('Delete')}>Delete</ContextMenuItem>
 *     </ContextMenuContent>
 * </ContextMenu>
 */

// Context for managing context menu state
const ContextMenuContext = createContext();
const ContextMenuSubContext = createContext();

export function ContextMenu({ children, ...props }) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    return (
        <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition }}>
            <div {...props}>{children}</div>
        </ContextMenuContext.Provider>
    );
}

export function ContextMenuTrigger({ children, asChild, className, disabled, ...props }) {
    const context = useContext(ContextMenuContext);

    const handleContextMenu = (e) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();

        context?.setPosition({ x: e.clientX, y: e.clientY });
        context?.setOpen(true);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onContextMenu: handleContextMenu,
        });
    }

    return (
        <div
            onContextMenu={handleContextMenu}
            className={className}
            {...props}
        >
            {children}
        </div>
    );
}

export function ContextMenuContent({ children, className, ...props }) {
    const context = useContext(ContextMenuContext);
    const contentRef = useRef(null);
    const [adjustedPosition, setAdjustedPosition] = useState({ top: 0, left: 0 });

    // Use click outside hook
    useClickOutside(
        contentRef,
        () => context?.setOpen(false),
        context?.open
    );

    // Use escape key hook
    useEscapeKey(
        () => context?.setOpen(false),
        context?.open
    );

    useEffect(() => {
        if (!context?.open || !contentRef.current) return;

        const rect = contentRef.current.getBoundingClientRect();
        let top = context.position.y;
        let left = context.position.x;

        // Adjust if menu would go off-screen
        if (left + rect.width > window.innerWidth) {
            left = window.innerWidth - rect.width - 8;
        }
        if (top + rect.height > window.innerHeight) {
            top = window.innerHeight - rect.height - 8;
        }
        if (left < 8) left = 8;
        if (top < 8) top = 8;

        setAdjustedPosition({ top, left });
    }, [context?.open, context?.position]);

    if (!context?.open) return null;

    return createPortal(
        <div
            ref={contentRef}
            className={cn(
                'z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80',
                className
            )}
            style={{
                position: 'fixed',
                top: `${adjustedPosition.top}px`,
                left: `${adjustedPosition.left}px`,
            }}
            {...props}
        >
            {children}
        </div>,
        document.body
    );
}

export const ContextMenuItem = React.forwardRef(function ContextMenuItem(
    { className, disabled, inset, onClick, children, ...props },
    ref
) {
    const context = useContext(ContextMenuContext);

    const handleClick = (e) => {
        if (disabled) return;
        onClick?.(e);
        context?.setOpen(false);
    };

    return (
        <div
            ref={ref}
            className={cn(
                'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
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

export function ContextMenuCheckboxItem({
    className,
    checked,
    onCheckedChange,
    children,
    disabled,
    ...props
}) {
    const handleClick = () => {
        if (disabled) return;
        onCheckedChange?.(!checked);
    };

    return (
        <div
            className={cn(
                'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
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

export function ContextMenuRadioGroup({ value, onValueChange, children, ...props }) {
    return (
        <div role="group" {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === ContextMenuRadioItem) {
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

export function ContextMenuRadioItem({
    className,
    value,
    checked,
    onSelect,
    children,
    disabled,
    ...props
}) {
    const handleClick = () => {
        if (disabled) return;
        onSelect?.(value);
    };

    return (
        <div
            className={cn(
                'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
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
                {checked && <Circle className="h-2 w-2 fill-current" />}
            </span>
            {children}
        </div>
    );
}

export function ContextMenuLabel({ className, inset, children, ...props }) {
    return (
        <div
            className={cn(
                'px-2 py-1.5 text-sm font-semibold',
                inset && 'pl-8',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function ContextMenuSeparator({ className, ...props }) {
    return (
        <div
            className={cn('-mx-1 my-1 h-px bg-border', className)}
            role="separator"
            {...props}
        />
    );
}

export function ContextMenuShortcut({ className, children, ...props }) {
    return (
        <span
            className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
            {...props}
        >
            {children}
        </span>
    );
}

export function ContextMenuSub({ children, ...props }) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);

    return (
        <ContextMenuSubContext.Provider value={{ open, setOpen, position, setPosition, triggerRef }}>
            <div {...props}>{children}</div>
        </ContextMenuSubContext.Provider>
    );
}

export function ContextMenuSubTrigger({ className, inset, children, disabled, ...props }) {
    const subContext = useContext(ContextMenuSubContext);
    const triggerRef = useRef(null);

    const handleMouseEnter = () => {
        if (disabled) return;
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        subContext?.setPosition({
            top: rect.top,
            left: rect.right,
        });
        subContext?.setOpen(true);
    };

    const handleMouseLeave = (e) => {
        // Check if we're moving to the submenu
        const submenu = document.querySelector('[data-context-submenu]');
        if (submenu && submenu.contains(e.relatedTarget)) {
            return;
        }
        subContext?.setOpen(false);
    };

    return (
        <div
            ref={triggerRef}
            className={cn(
                'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                !disabled && 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                inset && 'pl-8',
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={subContext?.open}
            aria-disabled={disabled}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </div>
    );
}

export function ContextMenuSubContent({ className, children, ...props }) {
    const subContext = useContext(ContextMenuSubContext);
    const contentRef = useRef(null);
    const [adjustedPosition, setAdjustedPosition] = useState({ top: 0, left: 0 });

    const handleMouseLeave = (e) => {
        // Check if we're moving to the trigger
        const trigger = subContext?.triggerRef?.current;
        if (trigger && trigger.contains(e.relatedTarget)) {
            return;
        }
        subContext?.setOpen(false);
    };

    useEffect(() => {
        if (!subContext?.open || !contentRef.current) return;

        const rect = contentRef.current.getBoundingClientRect();
        let top = subContext.position.top;
        let left = subContext.position.left;

        // Adjust if submenu would go off-screen
        if (left + rect.width > window.innerWidth) {
            left = subContext.position.left - rect.width - 8;
        }
        if (top + rect.height > window.innerHeight) {
            top = window.innerHeight - rect.height - 8;
        }
        if (top < 8) top = 8;

        setAdjustedPosition({ top, left });
    }, [subContext?.open, subContext?.position]);

    if (!subContext?.open) return null;

    return createPortal(
        <div
            ref={contentRef}
            data-context-submenu
            className={cn(
                'z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 slide-in-from-left-1',
                className
            )}
            style={{
                position: 'fixed',
                top: `${adjustedPosition.top}px`,
                left: `${adjustedPosition.left}px`,
            }}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </div>,
        document.body
    );
}
