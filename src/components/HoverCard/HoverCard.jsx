import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

// Context for managing hover card state
const HoverCardContext = createContext();

const hoverCardContentVariants = cva(
    'z-50 w-64 rounded-md border border-border bg-popover p-4 text-sm text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95',
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
            side: 'bottom',
        },
    }
);

export function HoverCard({ children, openDelay = 700, closeDelay = 300, ...props }) {
    const [open, setOpen] = useState(false);
    const openTimeoutRef = useRef(null);
    const closeTimeoutRef = useRef(null);
    const triggerRef = useRef(null);

    return (
        <HoverCardContext.Provider value={{ open, setOpen, openDelay, closeDelay, openTimeoutRef, closeTimeoutRef, triggerRef }}>
            <div {...props}>{children}</div>
        </HoverCardContext.Provider>
    );
}

export function HoverCardTrigger({ children, asChild, className, ...props }) {
    const context = useContext(HoverCardContext);

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
        if (context?.closeTimeoutRef) {
            context.closeTimeoutRef.current = setTimeout(() => {
                context?.setOpen(false);
            }, context?.closeDelay);
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
            'data-hovercard-trigger': '',
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onFocus: handleFocus,
            onBlur: handleBlur,
        });
    }

    return (
        <span
            ref={context?.triggerRef}
            data-hovercard-trigger=""
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

export function HoverCardContent({
    children,
    className,
    side = 'bottom',
    sideOffset = 8,
    align = 'center',
    ...props
}) {
    const context = useContext(HoverCardContext);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const contentRef = useRef(null);

    const handleMouseEnter = () => {
        if (context?.closeTimeoutRef) {
            clearTimeout(context.closeTimeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        if (context?.closeTimeoutRef) {
            context.closeTimeoutRef.current = setTimeout(() => {
                context?.setOpen(false);
            }, context?.closeDelay);
        }
    };

    useEffect(() => {
        if (!context?.open) return;

        const updatePosition = () => {
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
                    if (align === 'start') {
                        left = triggerRect.left;
                    } else if (align === 'end') {
                        left = triggerRect.right - contentRect.width;
                    }
                    break;
                case 'bottom':
                    top = triggerRect.bottom + sideOffset;
                    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                    if (align === 'start') {
                        left = triggerRect.left;
                    } else if (align === 'end') {
                        left = triggerRect.right - contentRect.width;
                    }
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                    left = triggerRect.left - contentRect.width - sideOffset;
                    if (align === 'start') {
                        top = triggerRect.top;
                    } else if (align === 'end') {
                        top = triggerRect.bottom - contentRect.height;
                    }
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                    left = triggerRect.right + sideOffset;
                    if (align === 'start') {
                        top = triggerRect.top;
                    } else if (align === 'end') {
                        top = triggerRect.bottom - contentRect.height;
                    }
                    break;
            }

            // Keep within viewport
            if (left + contentRect.width > window.innerWidth) {
                left = window.innerWidth - contentRect.width - 8;
            }
            if (left < 8) {
                left = 8;
            }
            if (top + contentRect.height > window.innerHeight) {
                top = window.innerHeight - contentRect.height - 8;
            }
            if (top < 8) {
                top = 8;
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
    }, [context?.open, side, sideOffset, align]);

    if (!context?.open) return null;

    return createPortal(
        <div
            ref={contentRef}
            className={cn(hoverCardContentVariants({ side }), className)}
            role="dialog"
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
        </div>,
        document.body
    );
}
