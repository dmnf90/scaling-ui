import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Card - A container component with rounded corners, border, and shadow
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Card content (typically CardHeader, CardContent, CardFooter)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Card>
 *     <CardHeader>
 *         <CardTitle>Card Title</CardTitle>
 *         <CardDescription>Card description goes here</CardDescription>
 *     </CardHeader>
 *     <CardContent>
 *         <p>Main content of the card</p>
 *     </CardContent>
 *     <CardFooter>
 *         <Button>Action</Button>
 *     </CardFooter>
 * </Card>
 */
export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * CardHeader - Header section of a Card, typically contains title and description
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Header content (CardTitle, CardDescription)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function CardHeader({ className, children, ...props }) {
    return (
        <div
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        >
            {children}
        </div>
    );
}

/**
 * CardTitle - Title text for a Card, renders as h3
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Title text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function CardTitle({ className, children, ...props }) {
    return (
        <h3
            className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
            {...props}
        >
            {children}
        </h3>
    );
}

/**
 * CardDescription - Descriptive text for a Card, styled in muted color
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Description text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function CardDescription({ className, children, ...props }) {
    return (
        <p
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        >
            {children}
        </p>
    );
}

/**
 * CardContent - Main content area of a Card
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Content elements
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function CardContent({ className, children, ...props }) {
    return (
        <div className={cn('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    );
}

/**
 * CardFooter - Footer section of a Card, typically for actions
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Footer content (buttons, links)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function CardFooter({ className, children, ...props }) {
    return (
        <div
            className={cn('flex items-center p-6 pt-0', className)}
            {...props}
        >
            {children}
        </div>
    );
}
