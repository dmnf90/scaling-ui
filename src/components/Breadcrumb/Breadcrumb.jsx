import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronRight, Slash, MoreHorizontal } from 'lucide-react';

/**
 * Breadcrumb - A navigation breadcrumb trail showing page hierarchy
 *
 * @param {Object} props - Component props
 * @param {'chevron' | 'slash' | 'dot'} [props.separator='chevron'] - Separator style between items
 * @param {React.ReactNode} [props.children] - BreadcrumbItem children
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Breadcrumb>
 *     <BreadcrumbItem>
 *         <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbItem>
 *         <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbItem active>
 *         <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 * </Breadcrumb>
 */
const breadcrumbVariants = cva(
    'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground'
);

export function Breadcrumb({ children, className, separator = 'chevron', ...props }) {
    // Check if user is manually managing separators
    const hasManualSeparators = React.Children.toArray(children).some(
        child => child?.type === BreadcrumbSeparator
    );

    return (
        <nav aria-label="breadcrumb" className={cn(breadcrumbVariants(), className)} {...props}>
            <ol className="flex flex-wrap items-center gap-1.5">
                {React.Children.map(children, (child, index) => {
                    if (!child) return null;

                    // If user is manually managing separators, just render children as-is
                    if (hasManualSeparators) {
                        return child;
                    }

                    // Otherwise, auto-inject separators between items
                    const isLast = index === React.Children.count(children) - 1;

                    return (
                        <>
                            {child}
                            {!isLast && <BreadcrumbSeparator separator={separator} />}
                        </>
                    );
                })}
            </ol>
        </nav>
    );
}

/**
 * BreadcrumbItem - Container for a single breadcrumb item
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.active] - Whether this is the current/active item
 * @param {React.ReactNode} [props.children] - Item content (BreadcrumbLink or BreadcrumbPage)
 * @param {string} [props.className] - Additional CSS classes
 */
export function BreadcrumbItem({ children, className, active, ...props }) {
    return (
        <li
            className={cn(
                'inline-flex items-center gap-1.5',
                active && 'text-foreground font-medium',
                className
            )}
            {...props}
        >
            {children}
        </li>
    );
}

/**
 * BreadcrumbLink - A clickable link in the breadcrumb trail
 *
 * @param {Object} props - Component props
 * @param {string} [props.href] - URL to navigate to
 * @param {React.ReactNode} [props.children] - Link text
 * @param {string} [props.className] - Additional CSS classes
 */
export function BreadcrumbLink({
    children,
    className,
    href,
    asChild,
    ...props
}) {
    const Component = href ? 'a' : 'span';

    return (
        <Component
            href={href}
            className={cn(
                'transition-colors',
                href && 'hover:text-foreground cursor-pointer',
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

/**
 * BreadcrumbSeparator - Visual separator between breadcrumb items
 *
 * @param {Object} props - Component props
 * @param {'chevron' | 'slash' | 'dot'} [props.separator='chevron'] - Separator icon type
 * @param {React.ReactNode} [props.children] - Custom separator content (overrides separator prop)
 * @param {string} [props.className] - Additional CSS classes
 */
export function BreadcrumbSeparator({ separator = 'chevron', children, className, ...props }) {
    // Custom separator via children takes priority
    if (children) {
        return (
            <li
                role="presentation"
                aria-hidden="true"
                className={cn('text-muted-foreground', className)}
                {...props}
            >
                {children}
            </li>
        );
    }

    // Predefined separators
    const separatorIcons = {
        slash: <Slash className="h-4 w-4" />,
        chevron: <ChevronRight className="h-4 w-4" />,
        dot: <span className="text-base">·</span>,
    };

    return (
        <li
            role="presentation"
            aria-hidden="true"
            className={cn('text-muted-foreground', className)}
            {...props}
        >
            {separatorIcons[separator] || separatorIcons.chevron}
        </li>
    );
}

/**
 * BreadcrumbEllipsis - Ellipsis indicator for collapsed breadcrumb items
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 */
export function BreadcrumbEllipsis({ className, ...props }) {
    return (
        <li
            role="presentation"
            aria-hidden="true"
            className={cn('flex h-9 w-9 items-center justify-center', className)}
            {...props}
        >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More</span>
        </li>
    );
}

/**
 * BreadcrumbPage - The current page indicator (non-clickable)
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Page name
 * @param {string} [props.className] - Additional CSS classes
 */
export function BreadcrumbPage({ children, className, ...props }) {
    return (
        <span
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn('font-medium text-foreground', className)}
            {...props}
        >
            {children}
        </span>
    );
}
