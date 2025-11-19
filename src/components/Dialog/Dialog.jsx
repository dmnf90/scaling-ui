import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { X } from 'lucide-react';

// Context for managing dialog state
const DialogContext = createContext();

const dialogOverlayVariants = cva(
    'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
);

const dialogContentVariants = cva(
    'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'
);

export function Dialog({
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
        <DialogContext.Provider value={{ open, setOpen }}>
            <div {...props}>{children}</div>
        </DialogContext.Provider>
    );
}

export function DialogTrigger({ children, asChild, className, ...props }) {
    const context = useContext(DialogContext);

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

export function DialogContent({
    children,
    className,
    onEscapeKeyDown,
    onPointerDownOutside,
    ...props
}) {
    const context = useContext(DialogContext);
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

        // Focus trap
        const focusableElements = contentRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
        }

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
                className={cn(dialogOverlayVariants())}
                data-state={context?.open ? 'open' : 'closed'}
                onClick={handleOverlayClick}
            />
            <div
                ref={contentRef}
                className={cn(dialogContentVariants(), className)}
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

export function DialogHeader({ children, className, ...props }) {
    return (
        <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props}>
            {children}
        </div>
    );
}

export function DialogTitle({ children, className, ...props }) {
    return (
        <h2
            className={cn('text-lg font-semibold leading-none tracking-tight', className)}
            {...props}
        >
            {children}
        </h2>
    );
}

export function DialogDescription({ children, className, ...props }) {
    return (
        <p className={cn('text-sm text-muted-foreground', className)} {...props}>
            {children}
        </p>
    );
}

export function DialogFooter({ children, className, ...props }) {
    return (
        <div
            className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function DialogClose({ children, className, asChild, ...props }) {
    const context = useContext(DialogContext);

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
