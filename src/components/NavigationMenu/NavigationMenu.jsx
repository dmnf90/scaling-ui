import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronDown } from 'lucide-react';

// Context for managing navigation menu state
const NavigationMenuContext = createContext();

const navigationMenuVariants = cva(
    'relative z-10 flex max-w-max flex-1 items-center justify-center',
    {
        variants: {
            orientation: {
                horizontal: 'flex-row',
                vertical: 'flex-col items-start',
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    }
);

export function NavigationMenu({
    children,
    className,
    orientation = 'horizontal',
    defaultValue,
    value: controlledValue,
    onValueChange,
    ...props
}) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const setValue = (newValue) => {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
    };

    return (
        <NavigationMenuContext.Provider value={{ value, setValue, orientation }}>
            <nav
                className={cn(navigationMenuVariants({ orientation }), className)}
                {...props}
            >
                <ul className={cn(
                    'flex list-none',
                    orientation === 'horizontal' ? 'flex-row space-x-1' : 'flex-col space-y-1 w-full'
                )}>
                    {children}
                </ul>
            </nav>
        </NavigationMenuContext.Provider>
    );
}

export function NavigationMenuItem({ children, value, className, ...props }) {
    const context = useContext(NavigationMenuContext);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);
    const itemRef = useRef(null);

    const isActive = context?.value === value;
    const orientation = context?.orientation || 'horizontal';

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
        context?.setValue(value);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            if (context?.value === value) {
                context?.setValue(null);
            }
        }, 100);
    };

    return (
        <li
            ref={itemRef}
            className={cn('relative', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {typeof children === 'function' ? children({ isOpen, isActive }) : children}
        </li>
    );
}

export function NavigationMenuTrigger({ children, className, asChild, ...props }) {
    return (
        <button
            className={cn(
                'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                aria-hidden="true"
            />
        </button>
    );
}

export function NavigationMenuContent({ children, className, ...props }) {
    const context = useContext(NavigationMenuContext);
    const orientation = context?.orientation || 'horizontal';

    return (
        <div
            className={cn(
                'absolute z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95',
                orientation === 'horizontal'
                    ? 'left-0 top-full mt-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
                    : 'left-full top-0 ml-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function NavigationMenuLink({
    children,
    className,
    active,
    href,
    ...props
}) {
    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            className={cn(
                'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                active && 'bg-accent text-accent-foreground',
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

export function NavigationMenuList({ children, className, ...props }) {
    return (
        <ul className={cn('grid gap-1 p-2', className)} {...props}>
            {children}
        </ul>
    );
}
