import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

// Context for managing tooltip state
const TooltipContext = createContext();

const tooltipContentVariants = cva(
    'z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
    {
        variants: {
            side: {
                top: 'slide-in-from-bottom-2',
                right: 'slide-in-from-left-2',
                bottom: 'slide-in-from-top-2',
                left: 'slide-in-from-right-2',
            },
        },
        defaultVariants: {
            side: 'top',
        },
    }
);

export function Tooltip({ children, delayDuration = 700, ...props }) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef(null);
    const triggerRef = useRef(null);

    return (
        <TooltipContext.Provider value={{ open, setOpen, delayDuration, timeoutRef, triggerRef }}>
            <div {...props}>{children}</div>
        </TooltipContext.Provider>
    );
}

export function TooltipTrigger({ children, asChild, className, ...props }) {
    const context = useContext(TooltipContext);

    const handleMouseEnter = () => {
        if (context?.timeoutRef) {
            clearTimeout(context.timeoutRef.current);
            context.timeoutRef.current = setTimeout(() => {
                context?.setOpen(true);
            }, context?.delayDuration);
        }
    };

    const handleMouseLeave = () => {
        if (context?.timeoutRef) {
            clearTimeout(context.timeoutRef.current);
        }
        context?.setOpen(false);
    };

    const handleFocus = () => {
        context?.setOpen(true);
    };

    const handleBlur = () => {
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
    ...props
}) {
    const context = useContext(TooltipContext);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const contentRef = useRef(null);

    useEffect(() => {
        if (!context?.open) return;

        const updatePosition = () => {
            // Use the trigger ref from context
            const trigger = context?.triggerRef?.current;
            if (!trigger || !contentRef.current) return;

            const triggerRect = trigger.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();

            let top = 0;
            let left = 0;

            switch (side) {
                case 'top':
                    top = triggerRect.top - contentRect.height - sideOffset;
                    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + sideOffset;
                    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                    left = triggerRect.left - contentRect.width - sideOffset;
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                    left = triggerRect.right + sideOffset;
                    break;
            }

            setPosition({ top, left });
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, [context?.open, side, sideOffset]);

    if (!context?.open) return null;

    return createPortal(
        <div
            ref={contentRef}
            className={cn(tooltipContentVariants({ side }), className)}
            role="tooltip"
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

// Helper to mark trigger for positioning
export const TooltipProvider = ({ children }) => {
    return <>{children}</>;
};
