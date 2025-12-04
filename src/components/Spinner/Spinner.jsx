import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Spinner - A loading indicator with animation
 *
 * @param {Object} props - Component props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Size of the spinner
 * @param {'default' | 'secondary' | 'muted'} [props.variant='default'] - Color variant
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * // Basic spinner
 * <Spinner />
 *
 * @example
 * // Different sizes
 * <Spinner size="sm" />
 * <Spinner size="lg" />
 *
 * @example
 * // In a button
 * <Button disabled>
 *     <Spinner size="sm" className="mr-2" />
 *     Loading...
 * </Button>
 */
const spinnerVariants = cva(
    'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
    {
        variants: {
            size: {
                sm: 'h-4 w-4 border-2',
                md: 'h-8 w-8 border-2',
                lg: 'h-12 w-12 border-[3px]',
                xl: 'h-16 w-16 border-4',
            },
            variant: {
                default: 'text-primary',
                secondary: 'text-secondary',
                muted: 'text-muted-foreground',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'default',
        },
    }
);

export function Spinner({
    className,
    size = 'md',
    variant = 'default',
    ...props
}) {
    return (
        <div
            role="status"
            className={cn(spinnerVariants({ size, variant }), className)}
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}
