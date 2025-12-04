import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Typography Components - Styled text elements for consistent typography
 *
 * Components:
 * - H1, H2, H3, H4: Heading elements with appropriate styling
 * - P: Paragraph with proper spacing
 * - Lead: Large introductory text
 * - Large: Large emphasized text
 * - Small: Small text
 * - Muted: Muted/subdued text
 * - InlineCode: Inline code snippet
 * - Blockquote: Styled blockquote
 *
 * @example
 * <H1>Main Heading</H1>
 * <Lead>This is a lead paragraph.</Lead>
 * <P>Regular paragraph text.</P>
 * <Muted>Some additional context.</Muted>
 */

/**
 * H1 - Main page heading (h1 element)
 */
export function H1({ className, children, ...props }) {
    return (
        <h1
            className={cn(
                'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
}

/**
 * H2 - Section heading (h2 element) with border
 */
export function H2({ className, children, ...props }) {
    return (
        <h2
            className={cn(
                'scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
}

/**
 * H3 - Subsection heading (h3 element)
 */
export function H3({ className, children, ...props }) {
    return (
        <h3
            className={cn(
                'scroll-m-20 text-2xl font-semibold tracking-tight',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

/**
 * H4 - Minor heading (h4 element)
 */
export function H4({ className, children, ...props }) {
    return (
        <h4
            className={cn(
                'scroll-m-20 text-xl font-semibold tracking-tight',
                className
            )}
            {...props}
        >
            {children}
        </h4>
    );
}

/**
 * P - Paragraph element with proper line height and spacing
 */
export function P({ className, children, ...props }) {
    return (
        <p
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...props}
        >
            {children}
        </p>
    );
}

/**
 * Lead - Large introductory paragraph text
 */
export function Lead({ className, children, ...props }) {
    return (
        <p
            className={cn('text-xl text-muted-foreground', className)}
            {...props}
        >
            {children}
        </p>
    );
}

/**
 * Large - Large emphasized text element
 */
export function Large({ className, children, ...props }) {
    return (
        <div className={cn('text-lg font-semibold', className)} {...props}>
            {children}
        </div>
    );
}

/**
 * Small - Small text element
 */
export function Small({ className, children, ...props }) {
    return (
        <small
            className={cn('text-sm font-medium leading-none', className)}
            {...props}
        >
            {children}
        </small>
    );
}

/**
 * Muted - Muted/subdued text for secondary information
 */
export function Muted({ className, children, ...props }) {
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
 * InlineCode - Inline code snippet with monospace font
 */
export function InlineCode({ className, children, ...props }) {
    return (
        <code
            className={cn(
                'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
                className
            )}
            {...props}
        >
            {children}
        </code>
    );
}

/**
 * Blockquote - Styled blockquote element with left border
 */
export function Blockquote({ className, children, ...props }) {
    return (
        <blockquote
            className={cn('mt-6 border-l-2 border-border pl-6 italic', className)}
            {...props}
        >
            {children}
        </blockquote>
    );
}
