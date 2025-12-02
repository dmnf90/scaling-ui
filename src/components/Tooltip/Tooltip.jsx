import React, { createContext, useContext, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { usePositioning } from '../../lib/hooks/usePositioning.js';

// Context for managing tooltip state
const TooltipContext = createContext();

const tooltipContentVariants = cva(
    'z-50 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
    {
        variants: {
            side: {
                top: 'slide-in-from-bottom-2',
                right: 'slide-in-from-left-2',
                bottom: 'slide-in-from-top-2',
                left: 'slide-in-from-right-2',
            },
            variant: {
                default: 'px-3 py-1.5 text-sm',
                rich: 'w-64 p-4 text-sm',
            },
        },
        defaultVariants: {
            side: 'top',
            variant: 'default',
        },
    }
);

/**
 * Tooltip component - can also be used as hover card with variant="rich"
 * @param {number} openDelay - Delay before showing tooltip (default: 700ms)
 * @param {number} closeDelay - Delay before hiding tooltip (default: 0, or 300 for rich variant)
 * @param {'default' | 'rich'} variant - 'default' for simple tooltips, 'rich' for hover card style
 */
export function Tooltip({
    children,
    openDelay = 700,
    closeDelay,
    variant = 'default',
    ...props
}) {
    const [open, setOpen] = useState(false);
    const openTimeoutRef = useRef(null);
    const closeTimeoutRef = useRef(null);
    const triggerRef = useRef(null);

    // Default closeDelay is 0 for default variant, 300 for rich variant
    const effectiveCloseDelay = closeDelay ?? (variant === 'rich' ? 300 : 0);

    return (
        <TooltipContext.Provider
            value={{
                open,
                setOpen,
                openDelay,
                closeDelay: effectiveCloseDelay,
                openTimeoutRef,
                closeTimeoutRef,
                triggerRef,
                variant,
            }}
        >
            <div {...props}>{children}</div>
        </TooltipContext.Provider>
    );
}

export function TooltipTrigger({ children, asChild, className, ...props }) {
    const context = useContext(TooltipContext);

    const handleMouseEnter = () => {
        if (context?.closeTimeoutRef) {
            clearTimeout(context.closeTimeoutRef.current);
        }
        if (context?.openTimeoutRef) {
            clearTimeout(context.openTimeoutRef.current);
            context.openTimeoutRef.current = setTimeout(() => {
                context?.setOpen(true);
            }, context?.openDelay);
        }
    };

    const handleMouseLeave = () => {
        if (context?.openTimeoutRef) {
            clearTimeout(context.openTimeoutRef.current);
        }
        if (context?.closeDelay > 0) {
            if (context?.closeTimeoutRef) {
                context.closeTimeoutRef.current = setTimeout(() => {
                    context?.setOpen(false);
                }, context?.closeDelay);
            }
        } else {
            context?.setOpen(false);
        }
    };

    const handleFocus = () => {
        if (context?.openTimeoutRef) {
            clearTimeout(context.openTimeoutRef.current);
            context.openTimeoutRef.current = setTimeout(() => {
                context?.setOpen(true);
            }, context?.openDelay);
        }
    };

    const handleBlur = () => {
        if (context?.openTimeoutRef) {
            clearTimeout(context.openTimeoutRef.current);
        }
        context?.setOpen(false);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ref: context?.triggerRef,
            'data-tooltip-trigger': '',
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onFocus: handleFocus,
            onBlur: handleBlur,
        });
    }

    return (
        <span
            ref={context?.triggerRef}
            data-tooltip-trigger=""
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={className}
            {...props}
        >
            {children}
        </span>
    );
}

export function TooltipContent({
    children,
    className,
    side = 'top',
    sideOffset = 4,
    align = 'center',
    showArrow = false,
    ...props
}) {
    const context = useContext(TooltipContext);
    const contentRef = useRef(null);

    // Use rich variant's default showArrow
    const effectiveShowArrow = showArrow || context?.variant === 'rich';
    const effectiveSideOffset = context?.variant === 'rich' ? (sideOffset || 8) : sideOffset;

    const position = usePositioning(context?.triggerRef, contentRef, {
        side,
        sideOffset: effectiveSideOffset,
        align,
        open: context?.open,
    });

    // Handle mouse enter/leave on content for rich variant (extends close delay)
    const handleMouseEnter = () => {
        if (context?.variant === 'rich' && context?.closeTimeoutRef) {
            clearTimeout(context.closeTimeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        if (context?.variant === 'rich' && context?.closeTimeoutRef) {
            context.closeTimeoutRef.current = setTimeout(() => {
                context?.setOpen(false);
            }, context?.closeDelay);
        }
    };

    if (!context?.open) return null;

    return createPortal(
        <div
            ref={contentRef}
            className={cn(tooltipContentVariants({ side, variant: context?.variant }), className)}
            role="tooltip"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
            {...props}
        >
            {children}
            {effectiveShowArrow && (
                <div
                    className={cn(
                        'absolute h-2 w-2 rotate-45 border bg-popover',
                        side === 'top' && 'bottom-[-5px] border-r border-b border-l-0 border-t-0',
                        side === 'bottom' && 'top-[-5px] border-l border-t border-r-0 border-b-0',
                        side === 'left' && 'right-[-5px] border-t border-r border-l-0 border-b-0',
                        side === 'right' && 'left-[-5px] border-b border-l border-t-0 border-r-0'
                    )}
                    style={{
                        [side === 'top' || side === 'bottom' ? 'left' : 'top']: '50%',
                        transform: side === 'top' || side === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
                    }}
                />
            )}
        </div>,
        document.body
    );
}

// Helper to mark trigger for positioning
export const TooltipProvider = ({ children }) => {
    return <>{children}</>;
};
