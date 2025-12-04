import React from 'react';
import { cn } from '../../lib/utils';

/**
 * InputGroup - Adds prefix and/or suffix elements to an input
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.prefix] - Content to show before the input (e.g., icon, text like "$")
 * @param {React.ReactNode} [props.suffix] - Content to show after the input (e.g., icon, text like ".com")
 * @param {React.ReactNode} [props.children] - Input element (usually Input component)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * // With text prefix
 * <InputGroup prefix="$">
 *     <Input placeholder="0.00" />
 * </InputGroup>
 *
 * @example
 * // With text suffix
 * <InputGroup suffix="@example.com">
 *     <Input placeholder="username" />
 * </InputGroup>
 *
 * @example
 * // With both prefix and suffix
 * <InputGroup prefix="https://" suffix=".com">
 *     <Input placeholder="domain" />
 * </InputGroup>
 */
export function InputGroup({
    prefix,
    suffix,
    className,
    children,
    ...props
}) {
    return (
        <div className={cn('flex items-center w-full', className)} {...props}>
            {prefix && (
                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md h-10">
                    {prefix}
                </span>
            )}
            <div className={cn('flex-1', prefix && 'rounded-l-none', suffix && 'rounded-r-none')}>
                {children}
            </div>
            {suffix && (
                <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-l-0 border-input rounded-r-md h-10">
                    {suffix}
                </span>
            )}
        </div>
    );
}
