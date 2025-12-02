import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronRight, Check } from 'lucide-react';

const DropdownMenuContext = createContext();
const DropdownMenuSubContext = createContext();

export function DropdownMenu({ children, open: controlledOpen, defaultOpen = false, onOpenChange, ...props }) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const triggerRef = useRef(null);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = (newOpen) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    return (
        <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
            <div {...props}>{children}</div>
        </DropdownMenuContext.Provider>
    );
}

export function DropdownMenuTrigger({ children, asChild, className, ...props }) {
    const context = useContext(DropdownMenuContext);

    const handleClick = () => {
        context?.setOpen(!context?.open);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ref: context?.triggerRef,
            onClick: handleClick,
            'aria-expanded': context?.open,
            'aria-haspopup': 'true',
        });
    }

    return (
        <button
            ref={context?.triggerRef}
            type="button"
            onClick={handleClick}
            aria-expanded={context?.open}
            aria-haspopup="true"
            className={className}
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

    useEffect(() => {
        if (!context?.open) return;

        const handleClickOutside = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {
                const trigger = event.target.closest('[aria-haspopup="true"]');
                if (!trigger) {
                    context?.setOpen(false);
                }
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                context?.setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [context?.open, context]);

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

export function DropdownMenuItem({ children, className, disabled, onClick, ...props }) {
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
    return <div className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />;
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

    return (
        <DropdownMenuSubContext.Provider value={{ isOpen, setIsOpen }}>
            <div
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                {...props}
            >
                {children}
            </div>
        </DropdownMenuSubContext.Provider>
    );
}

export function DropdownMenuSubTrigger({ children, className, disabled, ...props }) {
    return (
        <div
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

    if (!context?.isOpen) return null;

    return (
        <div
            className={cn(
                'absolute left-full top-0 z-50 ml-1 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
