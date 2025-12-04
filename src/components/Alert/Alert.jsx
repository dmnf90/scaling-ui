import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Alert - A callout component for displaying important messages
 *
 * Sub-components:
 * - AlertTitle: Title text for the alert
 * - AlertDescription: Description text for the alert
 *
 * @param {Object} props - Component props
 * @param {'default' | 'destructive' | 'success' | 'warning' | 'info'} [props.variant='default'] - Visual style variant
 * @param {React.ReactNode} [props.children] - Alert content (typically AlertTitle and AlertDescription)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Alert variant="success">
 *     <CheckCircle className="h-4 w-4" />
 *     <AlertTitle>Success!</AlertTitle>
 *     <AlertDescription>Your changes have been saved.</AlertDescription>
 * </Alert>
 */

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                destructive:
                    'border-destructive/50 text-destructive [&>svg]:text-destructive',
                success:
                    'border-green-500/50 text-green-700 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-300 dark:border-green-400/50',
                warning:
                    'border-yellow-500/50 text-yellow-700 dark:text-yellow-300 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-300 dark:border-yellow-400/50',
                info:
                    'border-blue-500/50 text-blue-700 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-300 dark:border-blue-400/50',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export function Alert({ className, variant, children, ...props }) {
    return (
        <div
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * AlertTitle - Title text for the Alert component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Title text content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function AlertTitle({ className, children, ...props }) {
    return (
        <h5
            className={cn('mb-1 font-medium leading-none tracking-tight', className)}
            {...props}
        >
            {children}
        </h5>
    );
}

/**
 * AlertDescription - Description text for the Alert component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Description text content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function AlertDescription({ className, children, ...props }) {
    return (
        <div
            className={cn('text-sm [&_p]:leading-relaxed', className)}
            {...props}
        >
            {children}
        </div>
    );
}
