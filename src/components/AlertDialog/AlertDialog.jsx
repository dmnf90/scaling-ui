import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

// Context for managing alert dialog state
const AlertDialogContext = createContext();

const alertDialogOverlayVariants = cva(
    'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
);

const alertDialogContentVariants = cva(
    'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg'
);

export function AlertDialog({
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
        <AlertDialogContext.Provider value={{ open, setOpen }}>
            <div {...props}>{children}</div>
        </AlertDialogContext.Provider>
    );
}

export function AlertDialogTrigger({ children, asChild, className, ...props }) {
    const context = useContext(AlertDialogContext);

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

export function AlertDialogContent({
    children,
    className,
    onEscapeKeyDown,
    ...props
}) {
    const context = useContext(AlertDialogContext);
    const contentRef = useRef(null);
    const cancelButtonRef = useRef(null);

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

        // Focus on cancel button if available, otherwise first focusable element
        setTimeout(() => {
            if (cancelButtonRef.current) {
                cancelButtonRef.current.focus();
            } else {
                const focusableElements = contentRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements && focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }
        }, 0);

        return () => {
            document.body.style.overflow = originalStyle;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [context?.open, onEscapeKeyDown, context]);

    if (!context?.open) return null;

    // Alert Dialog should NOT close on outside click (requires explicit action)
    return createPortal(
        <div>
            <div
                className={cn(alertDialogOverlayVariants())}
                data-state={context?.open ? 'open' : 'closed'}
            />
            <div
                ref={contentRef}
                className={cn(alertDialogContentVariants(), className)}
                data-state={context?.open ? 'open' : 'closed'}
                role="alertdialog"
                aria-modal="true"
                {...props}
            >
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === AlertDialogCancel) {
                        return React.cloneElement(child, { ref: cancelButtonRef });
                    }
                    return child;
                })}
            </div>
        </div>,
        document.body
    );
}

export function AlertDialogHeader({ children, className, ...props }) {
    return (
        <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props}>
            {children}
        </div>
    );
}

export function AlertDialogTitle({ children, className, ...props }) {
    return (
        <h2
            className={cn('text-lg font-semibold', className)}
            {...props}
        >
            {children}
        </h2>
    );
}

export function AlertDialogDescription({ children, className, ...props }) {
    return (
        <p className={cn('text-sm text-muted-foreground', className)} {...props}>
            {children}
        </p>
    );
}

export function AlertDialogFooter({ children, className, ...props }) {
    return (
        <div
            className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export const AlertDialogAction = React.forwardRef(({ children, className, variant = 'default', ...props }, ref) => {
    const context = useContext(AlertDialogContext);

    const handleClick = (e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented) {
            context?.setOpen(false);
        }
    };

    const variantClasses = {
        default: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
        destructive: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2',
    };

    return (
        <button
            ref={ref}
            type="button"
            className={cn(variantClasses[variant], className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
});

AlertDialogAction.displayName = 'AlertDialogAction';

export const AlertDialogCancel = React.forwardRef(({ children, className, ...props }, ref) => {
    const context = useContext(AlertDialogContext);

    const handleClick = (e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented) {
            context?.setOpen(false);
        }
    };

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
});

AlertDialogCancel.displayName = 'AlertDialogCancel';
