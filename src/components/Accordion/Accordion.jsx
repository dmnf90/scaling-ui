import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Accordion - A collapsible content container
 *
 * Sub-components:
 * - AccordionItem: Individual collapsible section
 * - AccordionTrigger: Clickable header to toggle content
 * - AccordionContent: Collapsible content area
 *
 * @param {Object} props - Component props
 * @param {'single' | 'multiple'} [props.type='single'] - Allow single or multiple open items
 * @param {string | string[]} [props.defaultValue] - Initially open item(s)
 * @param {boolean} [props.collapsible=false] - Allow all items to be closed (single mode only)
 * @param {React.ReactNode} [props.children] - AccordionItem children
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Accordion type="single" collapsible defaultValue="item-1">
 *     <AccordionItem value="item-1">
 *         <AccordionTrigger>Section 1</AccordionTrigger>
 *         <AccordionContent>Content for section 1</AccordionContent>
 *     </AccordionItem>
 *     <AccordionItem value="item-2">
 *         <AccordionTrigger>Section 2</AccordionTrigger>
 *         <AccordionContent>Content for section 2</AccordionContent>
 *     </AccordionItem>
 * </Accordion>
 */
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

/**
 * AccordionItem - Individual collapsible section within an Accordion
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Unique identifier for this item
 * @param {React.ReactNode} [props.children] - AccordionTrigger and AccordionContent
 * @param {string} [props.className] - Additional CSS classes
 */
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

/**
 * AccordionTrigger - Clickable header that toggles the accordion content
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Trigger label content
 * @param {string} [props.className] - Additional CSS classes
 */
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

/**
 * AccordionContent - Collapsible content area within an AccordionItem
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Content to display when expanded
 * @param {string} [props.className] - Additional CSS classes
 */
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
