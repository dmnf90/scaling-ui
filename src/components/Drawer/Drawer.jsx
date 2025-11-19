import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { X } from 'lucide-react';

const DrawerContext = createContext();

const drawerOverlayVariants = cva(
    'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
);

const drawerContentVariants = cva(
    'fixed z-50 bg-background shadow-lg transition-transform duration-300',
    {
        variants: {
            side: {
                top: 'top-0 left-0 right-0 border-b border-border data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0',
                bottom: 'bottom-0 left-0 right-0 border-t border-border data-[state=closed]:translate-y-full data-[state=open]:translate-y-0',
                left: 'top-0 bottom-0 left-0 w-3/4 max-w-sm border-r border-border data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0',
                right: 'top-0 bottom-0 right-0 w-3/4 max-w-sm border-l border-border data-[state=closed]:translate-x-full data-[state=open]:translate-x-0',
            },
        },
        defaultVariants: {
            side: 'right',
        },
    }
);

export function Drawer({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    ...props
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = (newOpen) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            <div {...props}>{children}</div>
        </DrawerContext.Provider>
    );
}

export function DrawerTrigger({ children, asChild, className, ...props }) {
    const context = useContext(DrawerContext);

    const handleClick = () => {
        context?.setOpen(true);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: handleClick,
        });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
}

export function DrawerContent({
    children,
    className,
    side = 'right',
    onEscapeKeyDown,
    onPointerDownOutside,
    ...props
}) {
    const context = useContext(DrawerContext);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!context?.open) return;

        // Lock body scroll
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        // Handle ESC key
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onEscapeKeyDown?.(e);
                if (!e.defaultPrevented) {
                    context?.setOpen(false);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalStyle;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [context?.open, onEscapeKeyDown, context]);

    if (!context?.open) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onPointerDownOutside?.(e);
            if (!e.defaultPrevented) {
                context?.setOpen(false);
            }
        }
    };

    return createPortal(
        <div>
            <div
                className={cn(drawerOverlayVariants())}
                data-state={context?.open ? 'open' : 'closed'}
                onClick={handleOverlayClick}
            />
            <div
                ref={contentRef}
                className={cn(drawerContentVariants({ side }), className)}
                data-state={context?.open ? 'open' : 'closed'}
                role="dialog"
                aria-modal="true"
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}

export function DrawerHeader({ children, className, ...props }) {
    return (
        <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
            {children}
        </div>
    );
}

export function DrawerTitle({ children, className, ...props }) {
    return (
        <h2
            className={cn('text-lg font-semibold leading-none tracking-tight', className)}
            {...props}
        >
            {children}
        </h2>
    );
}

export function DrawerDescription({ children, className, ...props }) {
    return (
        <p className={cn('text-sm text-muted-foreground', className)} {...props}>
            {children}
        </p>
    );
}

export function DrawerFooter({ children, className, ...props }) {
    return (
        <div className={cn('flex flex-col gap-2 p-6 pt-0', className)} {...props}>
            {children}
        </div>
    );
}

export function DrawerClose({ children, className, asChild, ...props }) {
    const context = useContext(DrawerContext);

    const handleClick = () => {
        context?.setOpen(false);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: handleClick,
        });
    }

    return (
        <button
            type="button"
            className={cn(
                'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children || <X className="h-4 w-4" />}
            <span className="sr-only">Close</span>
        </button>
    );
}
