import React from 'react';
import { Label } from '../Label/Label';
import { cn } from '../../lib/utils';

/**
 * Field - A form field wrapper with label, hint, and error message support
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Label text for the field
 * @param {string} [props.htmlFor] - ID of the form element this field contains
 * @param {boolean} [props.required=false] - Shows required indicator on label
 * @param {string} [props.error] - Error message to display (overrides hint)
 * @param {string} [props.hint] - Hint text shown below the input (hidden when error is present)
 * @param {React.ReactNode} [props.children] - Input element
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Field label="Email" htmlFor="email" required error={errors.email}>
 *     <Input id="email" type="email" variant={errors.email ? 'error' : 'default'} />
 * </Field>
 *
 * @example
 * <Field label="Username" htmlFor="username" hint="Must be 3-20 characters">
 *     <Input id="username" />
 * </Field>
 */
export function Field({
    label,
    htmlFor,
    required = false,
    error,
    hint,
    className,
    children,
    ...props
}) {
    return (
        <div className={cn('space-y-2', className)} {...props}>
            {label && (
                <Label htmlFor={htmlFor} required={required}>
                    {label}
                </Label>
            )}
            {children}
            {hint && !error && (
                <p className="text-sm text-muted-foreground">{hint}</p>
            )}
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}
