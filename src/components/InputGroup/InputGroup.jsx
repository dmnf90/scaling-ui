import React from 'react';
import { cn } from '../../lib/utils';

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
