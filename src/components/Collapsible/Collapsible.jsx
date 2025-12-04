import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

/**
 * Collapsible - A simple collapsible container component
 *
 * Sub-components:
 * - CollapsibleTrigger: Element that toggles the content
 * - CollapsibleContent: The collapsible content area
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.open] - Controlled open state
 * @param {boolean} [props.defaultOpen=false] - Initial open state (uncontrolled)
 * @param {function} [props.onOpenChange] - Callback when open state changes
 * @param {React.ReactNode} [props.children] - Collapsible sub-components
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Collapsible defaultOpen>
 *     <CollapsibleTrigger asChild>
 *         <Button variant="outline">Toggle</Button>
 *     </CollapsibleTrigger>
 *     <CollapsibleContent>
 *         <p>Collapsible content here</p>
 *     </CollapsibleContent>
 * </Collapsible>
 */

const CollapsibleContext = createContext();

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
        <CollapsibleContext.Provider value={{ isOpen, toggle: () => handleOpenChange(!isOpen) }}>
            <div
                className={cn('', className)}
                data-state={isOpen ? 'open' : 'closed'}
                {...props}
            >
                {children}
            </div>
        </CollapsibleContext.Provider>
    );
}

/**
 * CollapsibleTrigger - Element that toggles the collapsible content
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.asChild] - Merge props onto child element
 * @param {React.ReactNode} [props.children] - Trigger content
 * @param {string} [props.className] - Additional CSS classes
 */
export function CollapsibleTrigger({ asChild, className, children, onClick, ...props }) {
    const context = useContext(CollapsibleContext);

    const handleClick = (e) => {
        onClick?.(e);
        context?.toggle();
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: (e) => {
                children.props.onClick?.(e);
                handleClick(e);
            },
            className: cn(children.props.className, className),
            'data-state': context?.isOpen ? 'open' : 'closed',
            ...props,
        });
    }

    return (
        <button
            type="button"
            className={cn('', className)}
            onClick={handleClick}
            data-state={context?.isOpen ? 'open' : 'closed'}
            {...props}
        >
            {children}
        </button>
    );
}

/**
 * CollapsibleContent - The collapsible content area with animation
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Content to display when expanded
 * @param {string} [props.className] - Additional CSS classes
 */
export function CollapsibleContent({ className, children, ...props }) {
    const context = useContext(CollapsibleContext);
    const isOpen = context?.isOpen;

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
