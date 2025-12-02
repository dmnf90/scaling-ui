import React, { createContext, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { X } from 'lucide-react';
import { useControllableState } from '../../lib/hooks/useControllableState.js';
import { useEscapeKey } from '../../lib/hooks/useEscapeKey.js';
import { useBodyScrollLock } from '../../lib/hooks/useBodyScrollLock.js';

// Context for managing dialog state
const DialogContext = createContext();

const dialogOverlayVariants = cva(
    'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
);

const dialogContentVariants = cva(
    'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'
);

/**
 * Dialog component - can also be used for alert dialogs
 * @param {boolean} dismissible - When false, prevents closing via overlay click or ESC key (like AlertDialog). Default: true
 * @param {'first' | 'cancel'} initialFocus - Where to focus when dialog opens. 'cancel' focuses the cancel button. Default: 'first'
 */
export function Dialog({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    dismissible = true,
    initialFocus = 'first',
    ...props
}) {
    const [open, setOpen] = useControllableState({
        defaultValue: defaultOpen,
        value: controlledOpen,
        onChange: onOpenChange,
    });

    return (
        <DialogContext.Provider value={{ open, setOpen, dismissible, initialFocus }}>
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
    const cancelButtonRef = useRef(null);

    // Lock body scroll when dialog is open
    useBodyScrollLock(context?.open);

    // Handle ESC key (only if dismissible)
    useEscapeKey(
        (e) => {
            onEscapeKeyDown?.(e);
            if (!e.defaultPrevented && context?.dismissible) {
                context?.setOpen(false);
            }
        },
        context?.open
    );

    // Focus management on open
    React.useEffect(() => {
        if (!context?.open) return;

        const focusElement = () => {
            if (context?.initialFocus === 'cancel' && cancelButtonRef.current) {
                cancelButtonRef.current.focus();
            } else {
                const focusableElements = contentRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements && focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }
        };

        // Use setTimeout to ensure DOM is ready
        setTimeout(focusElement, 0);
    }, [context?.open, context?.initialFocus]);

    if (!context?.open) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onPointerDownOutside?.(e);
            if (!e.defaultPrevented && context?.dismissible) {
                context?.setOpen(false);
            }
        }
    };

    // Clone children to inject cancel button ref
    const processedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DialogCancel) {
            return React.cloneElement(child, { ref: cancelButtonRef });
        }
        return child;
    });

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
                role={context?.dismissible ? 'dialog' : 'alertdialog'}
                aria-modal="true"
                {...props}
            >
                {processedChildren}
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

/**
 * Action button for dialogs (typically used for confirm/submit actions)
 * Closes the dialog after click unless prevented
 */
export const DialogAction = React.forwardRef(({ children, className, variant = 'default', onClick, ...props }, ref) => {
    const context = useContext(DialogContext);

    const handleClick = (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
            context?.setOpen(false);
        }
    };

    const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    };

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
                variantClasses[variant],
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
});

DialogAction.displayName = 'DialogAction';

/**
 * Cancel button for dialogs
 * Closes the dialog after click unless prevented
 */
export const DialogCancel = React.forwardRef(({ children, className, onClick, ...props }, ref) => {
    const context = useContext(DialogContext);

    const handleClick = (e) => {
        onClick?.(e);
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

DialogCancel.displayName = 'DialogCancel';
