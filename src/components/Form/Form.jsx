import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Form - A form container that prevents default submission behavior
 *
 * @param {Object} props - Component props
 * @param {function} [props.onSubmit] - Submit handler, receives the form event
 * @param {React.ReactNode} [props.children] - Form fields and content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * @example
 * <Form onSubmit={handleSubmit}>
 *     <Field label="Email" htmlFor="email">
 *         <Input id="email" type="email" />
 *     </Field>
 *     <Button type="submit">Submit</Button>
 * </Form>
 */
export function Form({
    onSubmit,
    className,
    children,
    ...props
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn('space-y-6', className)}
            {...props}
        >
            {children}
        </form>
    );
}
