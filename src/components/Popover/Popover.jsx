import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export function Popover({ children }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

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

    const contextValue = { open, setOpen };

    return (
        <PopoverContext.Provider value={contextValue}>
            <div ref={containerRef} className="relative inline-block">
                {children}
            </div>
        </PopoverContext.Provider>
    );
}

const PopoverContext = React.createContext();

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
    const { open } = React.useContext(PopoverContext);

    if (!open) return null;

    const alignmentClasses = {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
    };

    return (
        <div
            className={cn(
                'absolute z-50 mt-2 min-w-[8rem] rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95',
                alignmentClasses[align],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
