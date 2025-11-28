import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Accordion({
    type = 'single',
    defaultValue,
    collapsible = false,
    className,
    children,
    ...props
}) {
    const [openItems, setOpenItems] = useState(() => {
        if (defaultValue === undefined) return [];
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    });

    const handleItemToggle = (value) => {
        if (type === 'single') {
            if (openItems.includes(value)) {
                if (collapsible) {
                    setOpenItems([]);
                }
            } else {
                setOpenItems([value]);
            }
        } else {
            if (openItems.includes(value)) {
                setOpenItems(openItems.filter((item) => item !== value));
            } else {
                setOpenItems([...openItems, value]);
            }
        }
    };

    return (
        <div className={cn('', className)} {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === AccordionItem) {
                    return React.cloneElement(child, {
                        isOpen: openItems.includes(child.props.value),
                        onToggle: () => handleItemToggle(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

export function AccordionItem({
    value,
    isOpen,
    onToggle,
    className,
    children,
    ...props
}) {
    return (
        <div
            className={cn('border-b border-border', className)}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    if (child.type === AccordionTrigger) {
                        return React.cloneElement(child, {
                            isOpen,
                            onClick: onToggle,
                        });
                    }
                    if (child.type === AccordionContent) {
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

export function AccordionTrigger({
    isOpen,
    onClick,
    className,
    children,
    ...props
}) {
    return (
        <button
            type="button"
            className={cn(
                'flex flex-1 w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
                className
            )}
            data-state={isOpen ? 'open' : 'closed'}
            onClick={onClick}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    );
}

export function AccordionContent({ isOpen, className, children, ...props }) {
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
                <div className="pb-4 pt-0 text-sm">{children}</div>
            </div>
        </div>
    );
}
