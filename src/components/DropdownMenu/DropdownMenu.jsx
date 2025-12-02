import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronRight, Check } from 'lucide-react';
import { useControllableState } from '../../lib/hooks/useControllableState.js';
import { useClickOutside } from '../../lib/hooks/useClickOutside.js';
import { useEscapeKey } from '../../lib/hooks/useEscapeKey.js';

const DropdownMenuContext = createContext();
const DropdownMenuSubContext = createContext();
const MenubarContext = createContext();

// ============================================================================
// MENUBAR COMPONENTS (horizontal menu bar container)
// ============================================================================

const menubarVariants = cva(
    'flex h-9 items-center space-x-1 rounded-md border border-border bg-background p-1 shadow-sm'
);

/**
 * MenubarRoot - Horizontal container for multiple dropdown menus
 * Manages which menu is currently open and handles hover-to-switch behavior
 */
export function MenubarRoot({ children, className, ...props }) {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
            <div className={cn(menubarVariants(), className)} {...props}>
                {children}
            </div>
        </MenubarContext.Provider>
    );
}

// ============================================================================
// DROPDOWN MENU COMPONENTS
// ============================================================================

export function DropdownMenu({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    value, // Optional: for menubar integration
    ...props
}) {
    const menubarContext = useContext(MenubarContext);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    // When in menubar context, sync with menubar state
    const isInMenubar = menubarContext !== undefined && menubarContext !== null;

    const [open, setOpen] = useControllableState({
        defaultValue: defaultOpen,
        value: isInMenubar ? (menubarContext.openMenu === value) : controlledOpen,
        onChange: (newOpen) => {
            if (isInMenubar) {
                menubarContext.setOpenMenu(newOpen ? value : null);
            }
            onOpenChange?.(newOpen);
        },
    });

    return (
        <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef, contentRef, value, isInMenubar }}>
            <div className={isInMenubar ? 'relative' : undefined} {...props}>
                {children}
            </div>
        </DropdownMenuContext.Provider>
    );
}

export function DropdownMenuTrigger({ children, asChild, className, ...props }) {
    const context = useContext(DropdownMenuContext);
    const menubarContext = useContext(MenubarContext);

    const handleClick = () => {
        context?.setOpen(!context?.open);
    };

    // In menubar context, also handle mouse enter to switch menus
    const handleMouseEnter = () => {
        if (context?.isInMenubar && menubarContext?.openMenu !== null) {
            context?.setOpen(true);
        }
    };

    const triggerProps = {
        ref: context?.triggerRef,
        onClick: handleClick,
        onMouseEnter: context?.isInMenubar ? handleMouseEnter : undefined,
        'aria-expanded': context?.open,
        'aria-haspopup': 'true',
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, triggerProps);
    }

    // Different styling for menubar vs regular dropdown
    const menubarTriggerClass = 'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground';
    const regularTriggerClass = className;

    return (
        <button
            type="button"
            className={cn(context?.isInMenubar ? menubarTriggerClass : regularTriggerClass, context?.open && context?.isInMenubar && 'bg-accent text-accent-foreground')}
            {...triggerProps}
            {...props}
        >
            {children}
        </button>
    );
}

export function DropdownMenuContent({ children, className, align = 'start', sideOffset = 4, ...props }) {
    const context = useContext(DropdownMenuContext);
    const contentRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // Use click outside hook
    useClickOutside(
        contentRef,
        (event) => {
            const trigger = event.target.closest('[aria-haspopup="true"]');
            if (!trigger) {
                context?.setOpen(false);
            }
        },
        context?.open
    );

    // Use escape key hook
    useEscapeKey(() => context?.setOpen(false), context?.open);

    useEffect(() => {
        if (!context?.open) return;

        const updatePosition = () => {
            const trigger = context?.triggerRef?.current;
            if (!trigger || !contentRef.current) return;

            const triggerRect = trigger.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();

            let top = triggerRect.bottom + sideOffset;
            let left = triggerRect.left;

            if (align === 'end') {
                left = triggerRect.right - contentRect.width;
            } else if (align === 'center') {
                left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
            }

            // Keep within viewport
            if (left + contentRect.width > window.innerWidth) {
                left = window.innerWidth - contentRect.width - 8;
            }
            if (left < 8) left = 8;

            setPosition({ top, left });
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [context?.open, align, sideOffset]);

    if (!context?.open) return null;

    // In menubar context, use absolute positioning instead of portal
    if (context?.isInMenubar) {
        return (
            <div
                ref={contentRef}
                className={cn(
                    'absolute z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95',
                    align === 'start' && 'left-0',
                    align === 'end' && 'right-0',
                    'top-full mt-1.5',
                    className
                )}
                role="menu"
                {...props}
            >
                {children}
            </div>
        );
    }

    return createPortal(
        <div
            ref={contentRef}
            className={cn(
                'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95',
                className
            )}
            role="menu"
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
            {...props}
        >
            {children}
        </div>,
        document.body
    );
}

export function DropdownMenuItem({ children, className, disabled, inset, onClick, ...props }) {
    const context = useContext(DropdownMenuContext);

    const handleClick = (e) => {
        if (!disabled) {
            onClick?.(e);
            context?.setOpen(false);
        }
    };

    return (
        <div
            role="menuitem"
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                inset && 'pl-8',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </div>
    );
}

export function DropdownMenuCheckboxItem({ children, className, checked, onCheckedChange, disabled, ...props }) {
    const handleClick = () => {
        if (!disabled) {
            onCheckedChange?.(!checked);
        }
    };

    return (
        <div
            role="menuitemcheckbox"
            aria-checked={checked}
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {checked && <Check className="h-4 w-4" />}
            </span>
            {children}
        </div>
    );
}

export function DropdownMenuRadioGroup({ children, value, onValueChange, ...props }) {
    return (
        <div role="group" {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        checked: child.props.value === value,
                        onCheckedChange: () => onValueChange?.(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

export function DropdownMenuRadioItem({ children, className, checked, onCheckedChange, disabled, value, ...props }) {
    const handleClick = () => {
        if (!disabled) {
            onCheckedChange?.(value);
        }
    };

    return (
        <div
            role="menuitemradio"
            aria-checked={checked}
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {checked && <div className="h-2 w-2 rounded-full bg-current" />}
            </span>
            {children}
        </div>
    );
}

export function DropdownMenuLabel({ children, className, ...props }) {
    return (
        <div className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props}>
            {children}
        </div>
    );
}

export function DropdownMenuSeparator({ className, ...props }) {
    return <div className={cn('-mx-1 my-1 h-px bg-border', className)} role="separator" {...props} />;
}

export function DropdownMenuShortcut({ children, className, ...props }) {
    return (
        <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props}>
            {children}
        </span>
    );
}

export function DropdownMenuSub({ children, ...props }) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);
    const triggerRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        // Small delay to allow moving to submenu
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <DropdownMenuSubContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                {children}
            </div>
        </DropdownMenuSubContext.Provider>
    );
}

export function DropdownMenuSubTrigger({ children, className, disabled, ...props }) {
    const context = useContext(DropdownMenuSubContext);

    return (
        <div
            ref={context?.triggerRef}
            className={cn(
                'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </div>
    );
}

export function DropdownMenuSubContent({ children, className, ...props }) {
    const context = useContext(DropdownMenuSubContext);
    const contentRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (!context?.isOpen || !context?.triggerRef?.current) return;

        const updatePosition = () => {
            const triggerRect = context.triggerRef.current.getBoundingClientRect();
            let top = triggerRect.top;
            let left = triggerRect.right + 4; // ml-1 equivalent

            // Adjust if would overflow right edge
            if (contentRef.current) {
                const contentRect = contentRef.current.getBoundingClientRect();
                if (left + contentRect.width > window.innerWidth - 8) {
                    left = triggerRect.left - contentRect.width - 4;
                }
                // Adjust if would overflow bottom
                if (top + contentRect.height > window.innerHeight - 8) {
                    top = window.innerHeight - contentRect.height - 8;
                }
            }

            setPosition({ top, left });
        };

        updatePosition();
    }, [context?.isOpen, context?.triggerRef]);

    if (!context?.isOpen) return null;

    return createPortal(
        <div
            ref={contentRef}
            className={cn(
                'fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95',
                className
            )}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            {...props}
        >
            {children}
        </div>,
        document.body
    );
}

// ============================================================================
// MENUBAR ALIASES (for backward compatibility and clear API)
// ============================================================================

export {
    MenubarRoot as Menubar,
    DropdownMenu as MenubarMenu,
    DropdownMenuTrigger as MenubarTrigger,
    DropdownMenuContent as MenubarContent,
    DropdownMenuItem as MenubarItem,
    DropdownMenuCheckboxItem as MenubarCheckboxItem,
    DropdownMenuRadioGroup as MenubarRadioGroup,
    DropdownMenuRadioItem as MenubarRadioItem,
    DropdownMenuLabel as MenubarLabel,
    DropdownMenuSeparator as MenubarSeparator,
    DropdownMenuShortcut as MenubarShortcut,
    DropdownMenuSub as MenubarSub,
    DropdownMenuSubTrigger as MenubarSubTrigger,
    DropdownMenuSubContent as MenubarSubContent,
};
