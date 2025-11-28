import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Empty({
    icon,
    title,
    description,
    action,
    className,
    ...props
}) {
    const IconComponent = icon || <Search className="w-12 h-12" />;

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center text-center py-12 px-4',
                className
            )}
            {...props}
        >
            <div className="text-muted-foreground mb-4">
                {IconComponent}
            </div>
            {title && (
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    {title}
                </h3>
            )}
            {description && (
                <p className="text-sm text-muted-foreground max-w-sm">
                    {description}
                </p>
            )}
            {action && (
                <div className="mt-4">
                    {action}
                </div>
            )}
        </div>
    );
}
