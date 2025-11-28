import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export function Collapsible({
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    className,
    children,
    ...props
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const handleOpenChange = (newOpen) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    return (
        <div
            className={cn('', className)}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    if (child.type === CollapsibleTrigger) {
                        return React.cloneElement(child, {
                            onClick: () => handleOpenChange(!isOpen),
                            'data-state': isOpen ? 'open' : 'closed',
                        });
                    }
                    if (child.type === CollapsibleContent) {
                        return React.cloneElement(child, {
                            isOpen,
                        });
                    }
                }
                return child;
            })}
        </div>
    );
}

export function CollapsibleTrigger({ asChild, className, children, onClick, ...props }) {
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: (e) => {
                children.props.onClick?.(e);
                onClick?.(e);
            },
            className: cn(children.props.className, className),
            ...props,
        });
    }

    return (
        <button
            type="button"
            className={cn('', className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}

export function CollapsibleContent({ isOpen, className, children, ...props }) {
    return (
        <div
            className={cn(
                'grid transition-all duration-200 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                className
            )}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            <div className="overflow-hidden">
                {children}
            </div>
        </div>
    );
}
