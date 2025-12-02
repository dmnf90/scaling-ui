import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

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
