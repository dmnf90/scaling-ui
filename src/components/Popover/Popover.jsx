import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

const PopoverContext = React.createContext();

export function Popover({ children }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const contextValue = { open, setOpen, containerRef, triggerRef };

    return (
        <PopoverContext.Provider value={contextValue}>
            <div ref={containerRef} className="relative inline-block">
                {children}
            </div>
        </PopoverContext.Provider>
    );
}

export function PopoverTrigger({ asChild, children, className, ...props }) {
    const { open, setOpen } = React.useContext(PopoverContext);

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: (e) => {
                children.props.onClick?.(e);
                setOpen(!open);
            },
        });
    }

    return (
        <button
            type="button"
            onClick={() => setOpen(!open)}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
}

export function PopoverContent({
    align = 'center',
    className,
    children,
    ...props
}) {
    const { open, containerRef } = React.useContext(PopoverContext);
    const contentRef = useRef(null);
    const [position, setPosition] = useState({ left: 0, adjustedAlign: align });

    useEffect(() => {
        if (!open || !contentRef.current || !containerRef?.current) return;

        const updatePosition = () => {
            const contentRect = contentRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const padding = 8; // Minimum padding from viewport edges

            let left = 0;
            let adjustedAlign = align;

            // Calculate initial position based on alignment
            if (align === 'start') {
                left = 0;
            } else if (align === 'end') {
                left = containerRect.width - contentRect.width;
            } else {
                left = (containerRect.width - contentRect.width) / 2;
            }

            // Check if content would overflow right edge
            const rightOverflow = containerRect.left + left + contentRect.width - (viewportWidth - padding);
            if (rightOverflow > 0) {
                left -= rightOverflow;
                adjustedAlign = 'end';
            }

            // Check if content would overflow left edge
            const leftOverflow = padding - (containerRect.left + left);
            if (leftOverflow > 0) {
                left += leftOverflow;
                adjustedAlign = 'start';
            }

            setPosition({ left, adjustedAlign });
        };

        // Initial position calculation
        updatePosition();

        // Recalculate on resize
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [open, align, containerRef]);

    if (!open) return null;

    return (
        <div
            ref={contentRef}
            className={cn(
                'absolute z-50 mt-2 min-w-[8rem] rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95',
                className
            )}
            style={{ left: `${position.left}px` }}
            {...props}
        >
            {children}
        </div>
    );
}
