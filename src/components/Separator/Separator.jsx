import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Separator - A visual divider between content sections
 *
 * @param {Object} props - Component props
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - Direction of the separator
 * @param {boolean} [props.decorative=true] - If true, removes semantic meaning (role="none")
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * // Horizontal divider (default)
 * <Separator />
 *
 * @example
 * // Vertical divider in flex container
 * <div className="flex items-center gap-4">
 *     <span>Item 1</span>
 *     <Separator orientation="vertical" className="h-4" />
 *     <span>Item 2</span>
 * </div>
 */
const separatorVariants = cva(
    'shrink-0 bg-border',
    {
        variants: {
            orientation: {
                horizontal: 'h-px w-full',
                vertical: 'h-full w-px',
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    }
);

export function Separator({
    className,
    orientation = 'horizontal',
    decorative = true,
    ...props
}) {
    return (
        <div
            role={decorative ? 'none' : 'separator'}
            aria-orientation={decorative ? undefined : orientation}
            className={cn(separatorVariants({ orientation }), className)}
            {...props}
        />
    );
}
