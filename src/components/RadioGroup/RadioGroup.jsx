import React from 'react';
import { cn } from '../../lib/utils';

/**
 * RadioGroup - A group of radio buttons for single selection
 *
 * @param {Object} props - Component props
 * @param {string} [props.value] - Currently selected value
 * @param {function} [props.onValueChange] - Callback when selection changes, receives the new value
 * @param {React.ReactNode} [props.children] - RadioGroupItem children
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <RadioGroup value={selected} onValueChange={setSelected}>
 *     <div className="flex items-center gap-2">
 *         <RadioGroupItem value="option1" />
 *         <Label>Option 1</Label>
 *     </div>
 *     <div className="flex items-center gap-2">
 *         <RadioGroupItem value="option2" />
 *         <Label>Option 2</Label>
 *     </div>
 * </RadioGroup>
 */
export function RadioGroup({ className, children, value, onValueChange, ...props }) {
    return (
        <div
            role="radiogroup"
            className={cn('grid gap-2', className)}
            {...props}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === RadioGroupItem) {
                    return React.cloneElement(child, {
                        checked: child.props.value === value,
                        onClick: () => onValueChange?.(child.props.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

/**
 * RadioGroupItem - Individual radio button within a RadioGroup
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Value for this option (required)
 * @param {boolean} [props.checked=false] - Whether this option is selected (managed by RadioGroup)
 * @param {boolean} [props.disabled=false] - Whether this option is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref to the button element
 * @returns {React.ReactElement}
 */
export const RadioGroupItem = React.forwardRef(({
    className,
    checked = false,
    value,
    disabled = false,
    ...props
}, ref) => {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={disabled}
            className={cn(
                'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            ref={ref}
            {...props}
        >
            {checked && (
                <span className="flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                </span>
            )}
        </button>
    );
});

RadioGroupItem.displayName = 'RadioGroupItem';
