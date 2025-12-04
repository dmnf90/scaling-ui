import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { X } from 'lucide-react';
import { useControllableState } from '../../lib/hooks/useControllableState.js';
import { useEscapeKey } from '../../lib/hooks/useEscapeKey.js';
import { useBodyScrollLock } from '../../lib/hooks/useBodyScrollLock.js';

/**
 * Drawer - A slide-out panel from any edge of the screen
 *
 * Sub-components:
 * - DrawerTrigger: Button to open the drawer
 * - DrawerContent: The drawer panel
 * - DrawerHeader/DrawerFooter: Layout sections
 * - DrawerTitle/DrawerDescription: Accessible title and description
 * - DrawerClose: Button to close the drawer
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.open] - Controlled open state
 * @param {boolean} [props.defaultOpen=false] - Initial open state
 * @param {function} [props.onOpenChange] - Callback when open state changes
 * @param {React.ReactNode} [props.children] - Drawer sub-components
 * @returns {React.ReactElement}
 *
 * @example
 * <Drawer>
 *     <DrawerTrigger asChild>
 *         <Button>Open Drawer</Button>
 *     </DrawerTrigger>
 *     <DrawerContent side="right">
 *         <DrawerHeader>
 *             <DrawerTitle>Drawer Title</DrawerTitle>
 *         </DrawerHeader>
 *         <p>Content here</p>
 *     </DrawerContent>
 * </Drawer>
 */

const DrawerContext = createContext();

// Hook to detect mobile viewport
function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Check initially
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}

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
    const [open, setOpen] = useControllableState({
        defaultValue: defaultOpen,
        value: controlledOpen,
        onChange: onOpenChange,
    });

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
    responsive = false,
    responsiveSide,
    onEscapeKeyDown,
    onPointerDownOutside,
    ...props
}) {
    const context = useContext(DrawerContext);
    const contentRef = useRef(null);
    const isMobile = useIsMobile();

    // Lock body scroll when drawer is open
    useBodyScrollLock(context?.open);

    // Handle ESC key
    useEscapeKey(
        (e) => {
            onEscapeKeyDown?.(e);
            if (!e.defaultPrevented) {
                context?.setOpen(false);
            }
        },
        context?.open
    );

    if (!context?.open) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onPointerDownOutside?.(e);
            if (!e.defaultPrevented) {
                context?.setOpen(false);
            }
        }
    };

    // Determine effective side based on responsive settings
    let effectiveSide = side;
    if (responsive && isMobile) {
        // Default mobile fallback: right -> bottom, left -> bottom
        if (responsiveSide) {
            effectiveSide = responsiveSide;
        } else if (side === 'right' || side === 'left') {
            effectiveSide = 'bottom';
        }
    }

    return createPortal(
        <div>
            <div
                className={cn(drawerOverlayVariants())}
                data-state={context?.open ? 'open' : 'closed'}
                onClick={handleOverlayClick}
            />
            <div
                ref={contentRef}
                className={cn(drawerContentVariants({ side: effectiveSide }), className)}
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
