import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Item - A flexible list item component with composable sub-components
 *
 * Sub-components:
 * - ItemIcon: Icon container with border
 * - ItemContent: Main content container
 * - ItemTitle: Title text
 * - ItemDescription: Description text
 * - ItemActions: Right-side actions container
 *
 * @param {Object} props - Component props
 * @param {string} [props.as='div'] - Element type to render as
 * @param {boolean} [props.interactive=false] - Add hover state
 * @param {boolean} [props.selected=false] - Selected state styling
 * @param {React.ReactNode} [props.children] - Item content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Item interactive>
 *     <ItemIcon><FileIcon /></ItemIcon>
 *     <ItemContent>
 *         <ItemTitle>Document.pdf</ItemTitle>
 *         <ItemDescription>2.5 MB • Updated today</ItemDescription>
 *     </ItemContent>
 *     <ItemActions>
 *         <Button variant="ghost" size="sm">View</Button>
 *     </ItemActions>
 * </Item>
 */
export function Item({
    as: Component = 'div',
    interactive = false,
    selected = false,
    className,
    children,
    ...props
}) {
    return (
        <Component
            className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md',
                interactive && 'cursor-pointer transition-colors hover:bg-accent',
                selected && 'bg-accent',
                className
            )}
            data-selected={selected ? 'true' : undefined}
            {...props}
        >
            {children}
        </Component>
    );
}

/**
 * ItemIcon - Icon container with border styling
 */
export function ItemIcon({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * ItemContent - Main content wrapper with flex-1 and overflow handling
 */
export function ItemContent({ className, children, ...props }) {
    return (
        <div className={cn('flex-1 min-w-0', className)} {...props}>
            {children}
        </div>
    );
}

/**
 * ItemTitle - Title text with truncation
 */
export function ItemTitle({ className, children, ...props }) {
    return (
        <div
            className={cn('font-medium leading-none truncate', className)}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * ItemDescription - Description text with muted styling
 */
export function ItemDescription({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'text-sm text-muted-foreground truncate mt-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * ItemActions - Right-side container for action buttons
 */
export function ItemActions({ className, children, ...props }) {
    return (
        <div
            className={cn('flex items-center gap-2 shrink-0', className)}
            {...props}
        >
            {children}
        </div>
    );
}
