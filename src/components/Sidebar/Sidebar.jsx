import React, {createContext, useContext, useState, useEffect, useRef} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Menu, X, ChevronLeft, ChevronDown } from 'lucide-react';

// Context for managing sidebar state
const SidebarContext = createContext();

// Context for managing sidebar group state
const SidebarGroupContext = createContext();

// SidebarProvider - Top-level provider for sidebar layout
export function SidebarProvider({
    children,
    defaultOpen = true,
    open: controlledOpen,
    onOpenChange,
    ...props
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = (value) => {
        if (!isControlled) {
            setUncontrolledOpen(value);
        }
        onOpenChange?.(value);
    };

    const toggleSidebar = () => setOpen(!open);

    return (
        <SidebarContext.Provider
            value={{
                open,
                setOpen,
                toggleSidebar,
                state: open ? 'expanded' : 'collapsed'
            }}
            {...props}
        >
            {children}
        </SidebarContext.Provider>
    );
}

// SidebarLayout - Container that creates positioning context
export function SidebarLayout({ children, className, ...props }) {
    return (
        <div className={cn("relative flex  w-full", className)} {...props}>
            {children}
        </div>
    );
}

// SidebarInset - Main content area wrapper
export function SidebarInset({ children, className, ...props }) {
    return (
        <main className={cn("flex-1 overflow-auto", className)} {...props}>
            {children}
        </main>
    );
}

// SidebarTrigger - External toggle button
export function SidebarTrigger({ className, ...props }) {
    const context = useContext(SidebarContext);

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary",
                className
            )}
            onClick={() => context?.toggleSidebar()}
            aria-label="Toggle Sidebar"
            {...props}
        >
            <Menu className="h-6 w-6" />
        </button>
    );
}

const sidebarVariants = cva(
    'flex flex-col bg-background border-r border-border transition-all duration-300',
    {
        variants: {
            variant: {
                fixed: 'relative',
                collapsible: 'relative',
                responsive: 'fixed inset-y-0 left-0 z-50 lg:relative',
            },
            collapsed: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            {
                variant: 'collapsible',
                collapsed: true,
                class: 'w-16',
            },
            {
                variant: 'collapsible',
                collapsed: false,
                class: 'w-64',
            },
        ],
        defaultVariants: {
            variant: 'fixed',
            collapsed: false,
        },
    }
);

export function Sidebar({
    children,
    className,
    variant = 'fixed',
    defaultCollapsed = false,
    collapsed: controlledCollapsed,
    onCollapsedChange,
    ...props
}) {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
    const [mobileOpen, setMobileOpen] = useState(false);
    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;

    const setCollapsed = (newCollapsed) => {
        if (!isControlled) {
            setUncontrolledCollapsed(newCollapsed);
        }
        onCollapsedChange?.(newCollapsed);
    };

    const toggleCollapsed = () => setCollapsed(!collapsed);
    const toggleMobile = () => setMobileOpen(!mobileOpen);

    // Get parent context from SidebarProvider if available
    const parentContext = useContext(SidebarContext);

    // Close mobile sidebar on escape
    useEffect(() => {
        if (variant !== 'responsive') return;

        const currentOpen = parentContext?.open ?? mobileOpen;
        const currentSetOpen = parentContext?.setOpen ?? setMobileOpen;

        const handleEscape = (e) => {
            if (e.key === 'Escape' && currentOpen) {
                currentSetOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [parentContext, mobileOpen, variant]);

    // Handle responsive sidebar
    if (variant === 'responsive') {
        // Use parent provider's state if available, otherwise use local state
        const open = parentContext?.open ?? mobileOpen;
        const setOpen = parentContext?.setOpen ?? setMobileOpen;

        return (
            <>
                {/* Mobile overlay */}
                {open && (
                    <div
                        className="absolute inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={cn(
                        'flex flex-col w-64 bg-background border-r border-border transition-transform duration-300 lg:translate-x-0',
                        open ? 'translate-x-0' : '-translate-x-full',
                        'absolute inset-y-0 left-0 z-50 lg:relative',
                        className
                    )}
                    {...props}
                >
                    {children}
                </aside>
            </>
        );
    }

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed,
                toggleCollapsed,
                variant,
                mobileOpen,
                toggleMobile,
            }}
        >
            <aside
                className={cn(
                    sidebarVariants({ variant, collapsed }),
                    variant === 'fixed' && 'w-64',
                    className
                )}
                {...props}
            >
                {children}
            </aside>
        </SidebarContext.Provider>
    );
}

export function SidebarHeader({ children, className, ...props }) {
    const context = useContext(SidebarContext);

    return (
        <div
            className={cn(
                'flex items-center justify-between p-4 border-b border-border transition-all duration-300',
                context?.collapsed && 'justify-center p-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarContent({ children, className, ...props }) {
    const context = useContext(SidebarContext);

    return (
        <div
            className={cn(
                'flex-1 min-h-0 overflow-y-auto transition-all duration-300',
                context?.collapsed ? 'flex justify-center mt-3' : 'p-4',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarFooter({ children, className, ...props }) {
    const context = useContext(SidebarContext);

    return (
        <div
            className={cn(
                'border-t border-border p-4 transition-all duration-300',
                context?.collapsed && 'p-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SidebarNav({ children, className, ...props }) {
    return (
        <nav className={cn('space-y-1', className)} {...props}>
            {children}
        </nav>
    );
}

export function SidebarNavItem({
    children,
    icon: Icon,
    active,
    className,
    href,
    as,
    ...props
}) {
    const context = useContext(SidebarContext);
    const Component = as || (href ? 'a' : 'button');

    return (
        <Component
            href={href}
            to={href}
            className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
                active && 'bg-accent text-accent-foreground',
                context?.collapsed && 'justify-center px-2',
                className
            )}
            {...props}
        >
            {Icon && <Icon className="h-5 w-5 shrink-0" />}
            {!context?.collapsed && <span>{children}</span>}
        </Component>
    );
}

export function SidebarToggle({ className, ...props }) {
    const context = useContext(SidebarContext);

    if (!context || context.variant === 'fixed') {
        return null;
    }

    if (context.variant === 'responsive') {
        return null; // Use mobile toggle button instead
    }

    return (
        <button
            className={cn(
                'flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary',
                className
            )}
            onClick={context.toggleCollapsed}
            aria-label={context.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            {...props}
        >
            <ChevronLeft
                className={cn(
                    'h-5 w-5 transition-transform duration-300',
                    context.collapsed && 'rotate-180'
                )}
            />
        </button>
    );
}

export function SidebarGroup({
    children,
    className,
    collapsible = false,
    defaultOpen = true,
    open: controlledOpen,
    onOpenChange,
    ...props
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const sidebarContext = useContext(SidebarContext);
    const contentRef = useRef(null);

    // Determine if controlled or uncontrolled
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const toggleOpen = () => {
        if (collapsible) {
            const newValue = !isOpen;
            if (isControlled) {
                onOpenChange?.(newValue);
            } else {
                setUncontrolledOpen(newValue);
            }
        }
    };

    // If sidebar is collapsed, don't show collapse UI
    const showCollapseUI = collapsible && !sidebarContext?.collapsed;

    // Separate label from other children
    const childrenArray = React.Children.toArray(children);
    const labelChild = childrenArray.find(
        child => child.type?.name === 'SidebarGroupLabel'
    );
    const otherChildren = childrenArray.filter(
        child => child.type?.name !== 'SidebarGroupLabel'
    );

    return (
        <SidebarGroupContext.Provider value={{ isOpen, toggleOpen, collapsible: showCollapseUI }}>
            <div className={cn('mb-6', className)} {...props}>
                {/* Label always visible */}
                {labelChild}

                {/* Content that collapses */}
                <div
                    ref={contentRef}
                    className={cn(
                        'grid transition-all duration-200 ease-in-out',
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                >
                    <div className="overflow-hidden">
                        {otherChildren}
                    </div>
                </div>
            </div>
        </SidebarGroupContext.Provider>
    );
}

export function SidebarGroupLabel({ children, className, ...props }) {
    const sidebarContext = useContext(SidebarContext);
    const groupContext = useContext(SidebarGroupContext);

    if (sidebarContext?.collapsed) {
        return null;
    }

    const isCollapsible = groupContext?.collapsible;

    if (isCollapsible) {
        return (
            <button
                onClick={groupContext?.toggleOpen}
                className={cn(
                    'flex items-center justify-between w-full px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors',
                    className
                )}
                aria-expanded={groupContext?.isOpen}
                {...props}
            >
                <span>{children}</span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        groupContext?.isOpen ? 'rotate-0' : '-rotate-90'
                    )}
                />
            </button>
        );
    }

    return (
        <div
            className={cn(
                'px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
