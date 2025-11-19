import React, { createContext, useContext, useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Menu, X, ChevronLeft } from 'lucide-react';

// Context for managing sidebar state
const SidebarContext = createContext();

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

    // Close mobile sidebar on escape
    useEffect(() => {
        if (variant !== 'responsive') return;

        const handleEscape = (e) => {
            if (e.key === 'Escape' && mobileOpen) {
                setMobileOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileOpen, variant]);

    // Handle responsive sidebar
    if (variant === 'responsive') {
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
                {/* Mobile toggle button */}
                <button
                    className="fixed top-4 left-4 z-50 lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    onClick={toggleMobile}
                    aria-label="Toggle sidebar"
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile overlay */}
                {mobileOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={cn(
                        'w-64 bg-background border-r border-border transition-transform duration-300 lg:translate-x-0',
                        mobileOpen ? 'translate-x-0' : '-translate-x-full',
                        variant === 'responsive' && 'fixed inset-y-0 left-0 z-50 lg:relative',
                        className
                    )}
                    {...props}
                >
                    {children}
                </aside>
            </SidebarContext.Provider>
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
                'flex items-center justify-between p-4 border-b border-border',
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
    return (
        <div className={cn('flex-1 overflow-y-auto p-4', className)} {...props}>
            {children}
        </div>
    );
}

export function SidebarFooter({ children, className, ...props }) {
    const context = useContext(SidebarContext);

    return (
        <div
            className={cn(
                'border-t border-border p-4',
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
    ...props
}) {
    const context = useContext(SidebarContext);
    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
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

export function SidebarGroup({ children, className, ...props }) {
    return (
        <div className={cn('space-y-3', className)} {...props}>
            {children}
        </div>
    );
}

export function SidebarGroupLabel({ children, className, ...props }) {
    const context = useContext(SidebarContext);

    if (context?.collapsed) {
        return null;
    }

    return (
        <div
            className={cn(
                'px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
