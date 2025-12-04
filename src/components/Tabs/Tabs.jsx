import React, { createContext, useContext, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Tabs - A tabbed interface for switching between content sections
 *
 * @param {Object} props - Component props
 * @param {string} [props.defaultValue] - Initially active tab value (uncontrolled)
 * @param {string} [props.value] - Active tab value (controlled)
 * @param {function} [props.onValueChange] - Callback when active tab changes
 * @param {React.ReactNode} [props.children] - TabsList and TabsContent children
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Tabs defaultValue="tab1">
 *     <TabsList>
 *         <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *         <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="tab1">Content for tab 1</TabsContent>
 *     <TabsContent value="tab2">Content for tab 2</TabsContent>
 * </Tabs>
 */

// Context for managing tab state
const TabsContext = createContext();

// Main Tabs wrapper - handles state management
export function Tabs({
    defaultValue,
    value: controlledValue,
    onValueChange,
    className,
    children,
    ...props
}) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newValue) => {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
    };

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div className={cn('w-full', className)} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

// Tabs List - Container for tab triggers
const tabsListVariants = cva(
    'inline-flex items-center justify-center rounded-md p-1',
    {
        variants: {
            variant: {
                default: 'bg-muted text-muted-foreground',
                pills: 'gap-2 bg-transparent',
                underline: 'gap-4 bg-transparent border-b border-border',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

/**
 * TabsList - Container for tab triggers
 *
 * @param {Object} props - Component props
 * @param {'default' | 'pills' | 'underline'} [props.variant='default'] - Visual style variant
 * @param {React.ReactNode} [props.children] - TabsTrigger children
 * @param {string} [props.className] - Additional CSS classes
 */
export function TabsList({ className, variant = 'default', children, ...props }) {
    return (
        <div
            role="tablist"
            className={cn(tabsListVariants({ variant }), className)}
            {...props}
        >
            {children}
        </div>
    );
}

// Tab Trigger - Individual tab button
const tabsTriggerVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
                pills: 'rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:hover:bg-muted',
                underline: 'rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

/**
 * TabsTrigger - A tab button that switches content
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Unique value for this tab (required)
 * @param {'default' | 'pills' | 'underline'} [props.variant='default'] - Visual style variant
 * @param {boolean} [props.disabled=false] - Whether the tab is disabled
 * @param {React.ReactNode} [props.children] - Tab label
 * @param {string} [props.className] - Additional CSS classes
 */
export function TabsTrigger({ value, className, variant = 'default', children, disabled, ...props }) {
    const context = useContext(TabsContext);
    const isActive = context?.value === value;

    return (
        <button
            role="tab"
            type="button"
            aria-selected={isActive}
            data-state={isActive ? 'active' : 'inactive'}
            disabled={disabled}
            className={cn(tabsTriggerVariants({ variant }), className)}
            onClick={() => context?.onValueChange(value)}
            {...props}
        >
            {children}
        </button>
    );
}

/**
 * TabsContent - Content panel for a tab
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Value matching the corresponding TabsTrigger (required)
 * @param {React.ReactNode} [props.children] - Tab content
 * @param {string} [props.className] - Additional CSS classes
 */
export function TabsContent({ value, className, children, ...props }) {
    const context = useContext(TabsContext);
    const isActive = context?.value === value;

    if (!isActive) return null;

    return (
        <div
            role="tabpanel"
            className={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
            {...props}
        >
            {children}
        </div>
    );
}
