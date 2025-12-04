import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

/**
 * Select - A native select dropdown with custom styling
 *
 * @param {Object} props - Component props
 * @param {'default' | 'error'} [props.variant='default'] - Visual style variant. Use 'error' for validation errors
 * @param {boolean} [props.disabled=false] - Whether the select is disabled
 * @param {string} [props.value] - Controlled value
 * @param {string} [props.defaultValue] - Default value for uncontrolled mode
 * @param {function} [props.onChange] - Change event handler
 * @param {React.ReactNode} [props.children] - Option elements
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref to the select element
 * @returns {React.ReactElement}
 *
 * @example
 * // Basic usage
 * <Select>
 *     <option value="">Select an option</option>
 *     <option value="1">Option 1</option>
 *     <option value="2">Option 2</option>
 * </Select>
 *
 * @example
 * // With error state
 * <Select variant="error">
 *     <option value="">Please select</option>
 * </Select>
 */
const selectVariants = cva(
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default: '',
                error: 'border-destructive focus:ring-destructive',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export const Select = React.forwardRef(({
    className,
    variant = 'default',
    children,
    ...props
}, ref) => {
    return (
        <div className="relative inline-block w-full">
            <select
                className={cn(selectVariants({ variant }), 'appearance-none pr-8', className)}
                ref={ref}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50 pointer-events-none" />
        </div>
    );
});

Select.displayName = 'Select';
