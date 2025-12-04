import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Empty - An empty state component for when there's no data to display
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.icon] - Custom icon element (defaults to Search icon)
 * @param {string} [props.title] - Title text for the empty state
 * @param {string} [props.description] - Description text explaining the empty state
 * @param {React.ReactNode} [props.action] - Action element (e.g., a Button to create new item)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Empty
 *     icon={<Inbox className="w-12 h-12" />}
 *     title="No messages"
 *     description="You don't have any messages yet."
 *     action={<Button>Compose message</Button>}
 * />
 */
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
