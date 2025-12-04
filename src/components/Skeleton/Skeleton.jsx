import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Skeleton - A loading placeholder with pulse animation
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - CSS classes to control size/shape (e.g., "h-4 w-[200px] rounded-full")
 * @returns {React.ReactElement}
 *
 * @example
 * // Text placeholder
 * <Skeleton className="h-4 w-[250px]" />
 *
 * @example
 * // Avatar placeholder
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * @example
 * // Card skeleton
 * <div className="space-y-2">
 *     <Skeleton className="h-4 w-[250px]" />
 *     <Skeleton className="h-4 w-[200px]" />
 * </div>
 */
export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-primary/10', className)}
            {...props}
        />
    );
}
