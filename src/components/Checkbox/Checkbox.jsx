import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

/**
 * Checkbox - A toggleable checkbox component with accessible ARIA attributes
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.checked=false] - Whether the checkbox is checked
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @param {function} [props.onClick] - Click handler to toggle state
 * @param {function} [props.onChange] - Change handler (receives event)
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref to the button element
 * @returns {React.ReactElement}
 *
 * @example
 * // Controlled checkbox
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
 *
 * @example
 * // With label
 * <div className="flex items-center gap-2">
 *     <Checkbox id="terms" checked={agreed} onClick={() => setAgreed(!agreed)} />
 *     <Label htmlFor="terms">I agree to the terms</Label>
 * </div>
 */
export const Checkbox = React.forwardRef(({
    className,
    checked,
    disabled,
    ...props
}, ref) => {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            className={cn(
                'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                checked ? 'bg-primary text-primary-foreground' : 'bg-background',
                className
            )}
            ref={ref}
            {...props}
        >
            {checked && (
                <Check className="h-4 w-4" strokeWidth={3} />
            )}
        </button>
    );
});

Checkbox.displayName = 'Checkbox';
