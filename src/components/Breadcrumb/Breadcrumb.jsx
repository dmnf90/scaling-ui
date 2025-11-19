import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { ChevronRight, Slash, MoreHorizontal } from 'lucide-react';

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
