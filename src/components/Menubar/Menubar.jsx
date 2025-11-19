import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronRight, Check } from 'lucide-react';

// Context for managing menubar state
const MenubarContext = createContext();
const MenubarMenuContext = createContext();

const menubarVariants = cva(
    'flex h-9 items-center space-x-1 rounded-md border border-border bg-background p-1 shadow-sm'
);

export function Menubar({ children, className, ...props }) {
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
            <div
                className={cn(menubarVariants(), className)}
                {...props}
            >
                {children}
            </div>
        </MenubarContext.Provider>
    );
}

export function MenubarMenu({ children, value, ...props }) {
    const context = useContext(MenubarContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (context?.openMenu === value) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [context?.openMenu, value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
                if (context?.openMenu === value) {
                    context?.setOpenMenu(null);
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, context, value]);

    const toggleMenu = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        context?.setOpenMenu(newIsOpen ? value : null);
    };

    return (
        <MenubarMenuContext.Provider value={{ isOpen, toggleMenu, value }}>
            <div ref={menuRef} className="relative" {...props}>
                {children}
            </div>
        </MenubarMenuContext.Provider>
    );
}

export function MenubarTrigger({ children, className, ...props }) {
    const context = useContext(MenubarMenuContext);

    return (
        <button
            className={cn(
                'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                context?.isOpen && 'bg-accent text-accent-foreground',
                className
            )}
            onClick={context?.toggleMenu}
            aria-expanded={context?.isOpen}
            {...props}
        >
            {children}
        </button>
    );
}

export function MenubarContent({ children, className, align = 'start', ...props }) {
    const context = useContext(MenubarMenuContext);

    if (!context?.isOpen) return null;

    return (
        <div
            className={cn(
                'absolute z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95',
                align === 'start' && 'left-0',
                align === 'end' && 'right-0',
                'top-full mt-1.5',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function MenubarItem({
    children,
    className,
    disabled,
    onClick,
    ...props
}) {
    const menuContext = useContext(MenubarMenuContext);

    const handleClick = (e) => {
        if (!disabled) {
            onClick?.(e);
            menuContext?.toggleMenu();
        }
    };

    return (
        <div
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </div>
    );
}

export function MenubarCheckboxItem({
    children,
    className,
    checked,
    onCheckedChange,
    disabled,
    ...props
}) {
    const handleClick = () => {
        if (!disabled) {
            onCheckedChange?.(!checked);
        }
    };

    return (
        <div
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {checked && <Check className="h-4 w-4" />}
            </span>
            {children}
        </div>
    );
}

export function MenubarRadioGroup({ children, value, onValueChange, ...props }) {
    return (
        <div role="group" {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        checked: child.props.value === value,
                        onCheckedChange: () => onValueChange?.(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

export function MenubarRadioItem({
    children,
    className,
    checked,
    onCheckedChange,
    disabled,
    value,
    ...props
}) {
    const handleClick = () => {
        if (!disabled) {
            onCheckedChange?.(value);
        }
    };

    return (
        <div
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {checked && (
                    <div className="h-2 w-2 rounded-full bg-current" />
                )}
            </span>
            {children}
        </div>
    );
}

export function MenubarSeparator({ className, ...props }) {
    return (
        <div
            className={cn('-mx-1 my-1 h-px bg-border', className)}
            {...props}
        />
    );
}

export function MenubarLabel({ children, className, ...props }) {
    return (
        <div
            className={cn('px-2 py-1.5 text-sm font-semibold text-foreground', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function MenubarSub({ children, ...props }) {
    const [isOpen, setIsOpen] = useState(false);
    const subRef = useRef(null);

    return (
        <MenubarSubContext.Provider value={{ isOpen, setIsOpen }}>
            <div
                ref={subRef}
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                {...props}
            >
                {children}
            </div>
        </MenubarSubContext.Provider>
    );
}

const MenubarSubContext = createContext();

export function MenubarSubTrigger({ children, className, disabled, ...props }) {
    return (
        <div
            className={cn(
                'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </div>
    );
}

export function MenubarSubContent({ children, className, ...props }) {
    const context = useContext(MenubarSubContext);

    if (!context?.isOpen) return null;

    return (
        <div
            className={cn(
                'absolute left-full top-0 z-50 ml-1 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function MenubarShortcut({ children, className, ...props }) {
    return (
        <span
            className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
            {...props}
        >
            {children}
        </span>
    );
}
